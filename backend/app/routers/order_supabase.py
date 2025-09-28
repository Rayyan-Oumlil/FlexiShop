"""
Router Order avec Supabase
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.database import get_supabase_client
from app.schemas import OrderCreate, OrderOut, OrderItemCreate
from app.routers.simple_auth import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderOut)
async def create_order(
    order: OrderCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new order"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        # Get user's cart
        cart_result = client.select('cart', '*', {'user_id': f'eq.{current_user["id"]}'})
        if not ('data' in cart_result and cart_result['data']):
            raise HTTPException(status_code=404, detail="Cart not found")
        
        cart = cart_result['data'][0]
        cart_id = cart['id']
        
        # Get cart items
        items_result = client.select('cart_items', '*', {'cart_id': f'eq.{cart_id}'})
        if not ('data' in items_result and items_result['data']):
            raise HTTPException(status_code=400, detail="Cart is empty")
        
        cart_items = items_result['data']
        
        # Calculate total amount
        total_amount = 0.0
        order_items_data = []
        
        for item in cart_items:
            # Get product details
            product_result = client.select('products', '*', {'id': f'eq.{item["product_id"]}'})
            if 'data' in product_result and product_result['data']:
                product = product_result['data'][0]
                item_total = item['quantity'] * product['price']
                total_amount += item_total
                
                order_items_data.append({
                    "product_id": item['product_id'],
                    "quantity": item['quantity'],
                    "price": product['price']
                })
        
        # Create order
        order_data = {
            "user_id": current_user["id"],
            "total_amount": total_amount,
            "status": "pending",
            "shipping_address": order.shipping_address,
            "payment_method": order.payment_method
        }
        
        order_result = client.insert('orders', order_data)
        if not ('data' in order_result and order_result['data']):
            raise HTTPException(status_code=500, detail=f"Database error: {order_result.get('error', 'Unknown error')}")
        
        order_created = order_result['data'][0]
        order_id = order_created['id']
        
        # Create order items
        for item_data in order_items_data:
            item_data['order_id'] = order_id
            client.insert('order_items', item_data)
        
        # Clear cart
        client.delete('cart_items', {'cart_id': f'eq.{cart_id}'})
        
        return {
            "id": order_created['id'],
            "user_id": order_created['user_id'],
            "total_amount": order_created['total_amount'],
            "status": order_created['status'],
            "shipping_address": order_created['shipping_address'],
            "payment_method": order_created['payment_method'],
            "created_at": order_created['created_at']
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating order: {str(e)}")

@router.get("/", response_model=List[OrderOut])
async def get_user_orders(current_user: dict = Depends(get_current_user)):
    """Get user's orders"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        result = client.select('orders', '*', {'user_id': f'eq.{current_user["id"]}'})
        if 'data' in result:
            orders = result['data']
            return [
                {
                    "id": order['id'],
                    "user_id": order['user_id'],
                    "total_amount": order['total_amount'],
                    "status": order['status'],
                    "shipping_address": order['shipping_address'],
                    "payment_method": order['payment_method'],
                    "created_at": order['created_at']
                }
                for order in orders
            ]
        else:
            return []
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching orders: {str(e)}")

@router.get("/{order_id}", response_model=OrderOut)
async def get_order(
    order_id: int,
    current_user: dict = Depends(get_current_user)
):
    """Get specific order"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        result = client.select('orders', '*', {
            'id': f'eq.{order_id}',
            'user_id': f'eq.{current_user["id"]}'
        })
        
        if 'data' in result and result['data']:
            order = result['data'][0]
            return {
                "id": order['id'],
                "user_id": order['user_id'],
                "total_amount": order['total_amount'],
                "status": order['status'],
                "shipping_address": order['shipping_address'],
                "payment_method": order['payment_method'],
                "created_at": order['created_at']
            }
        else:
            raise HTTPException(status_code=404, detail="Order not found")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching order: {str(e)}")

@router.put("/{order_id}/status")
async def update_order_status(
    order_id: int,
    status: str,
    current_user: dict = Depends(get_current_user)
):
    """Update order status (admin only)"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        # Verify order exists and belongs to user
        result = client.select('orders', '*', {
            'id': f'eq.{order_id}',
            'user_id': f'eq.{current_user["id"]}'
        })
        
        if not ('data' in result and result['data']):
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Update status
        update_result = client.update('orders', 
            {'status': status}, 
            {'id': f'eq.{order_id}'}
        )
        
        if 'data' in update_result:
            return {"message": f"Order status updated to {status}"}
        else:
            raise HTTPException(status_code=500, detail="Failed to update order status")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating order status: {str(e)}")
