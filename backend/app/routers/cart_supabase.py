"""
Router Cart avec Supabase
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.database import get_supabase_client
from app.schemas import CartItemCreate, CartItemOut, CartOut
from app.routers.simple_auth import get_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("/", response_model=CartOut)
async def get_cart(current_user: dict = Depends(get_current_user)):
    """Get user's cart"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        # Get user's cart
        result = client.select('cart', '*', {'user_id': f'eq.{current_user["id"]}'})
        if 'data' in result and result['data']:
            cart = result['data'][0]
            cart_id = cart['id']
            
            # Get cart items
            items_result = client.select('cart_items', '*', {'cart_id': f'eq.{cart_id}'})
            if 'data' in items_result:
                items = items_result['data']
                
                # Get product details for each item
                cart_items = []
                for item in items:
                    product_result = client.select('products', '*', {'id': f'eq.{item["product_id"]}'})
                    if 'data' in product_result and product_result['data']:
                        product = product_result['data'][0]
                        cart_items.append({
                            "id": item['id'],
                            "product_id": item['product_id'],
                            "quantity": item['quantity'],
                            "product": {
                                "id": product['id'],
                                "name": product['name'],
                                "price": product['price'],
                                "image_url": product.get('image_url')
                            }
                        })
                
                return {
                    "id": cart['id'],
                    "user_id": cart['user_id'],
                    "items": cart_items,
                    "total_items": sum(item['quantity'] for item in cart_items),
                    "total_price": sum(item['quantity'] * item['product']['price'] for item in cart_items)
                }
            else:
                return {
                    "id": cart['id'],
                    "user_id": cart['user_id'],
                    "items": [],
                    "total_items": 0,
                    "total_price": 0.0
                }
        else:
            # Create new cart if doesn't exist
            cart_data = {"user_id": current_user["id"]}
            result = client.insert('cart', cart_data)
            if 'data' in result:
                cart = result['data'][0]
                return {
                    "id": cart['id'],
                    "user_id": cart['user_id'],
                    "items": [],
                    "total_items": 0,
                    "total_price": 0.0
                }
            else:
                raise HTTPException(status_code=500, detail=f"Database error: {result.get('error', 'Unknown error')}")
                
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting cart: {str(e)}")

@router.post("/items", response_model=CartItemOut)
async def add_to_cart(
    item: CartItemCreate,
    current_user: dict = Depends(get_current_user)
):
    """Add item to cart"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        # Get or create cart
        cart_result = client.select('cart', '*', {'user_id': f'eq.{current_user["id"]}'})
        if 'data' in cart_result and cart_result['data']:
            cart = cart_result['data'][0]
            cart_id = cart['id']
        else:
            # Create new cart
            cart_data = {"user_id": current_user["id"]}
            cart_result = client.insert('cart', cart_data)
            if 'data' in cart_result:
                cart_id = cart_result['data'][0]['id']
            else:
                raise HTTPException(status_code=500, detail="Failed to create cart")
        
        # Check if item already exists in cart
        existing_item = client.select('cart_items', '*', {
            'cart_id': f'eq.{cart_id}',
            'product_id': f'eq.{item.product_id}'
        })
        
        if 'data' in existing_item and existing_item['data']:
            # Update existing item
            existing = existing_item['data'][0]
            new_quantity = existing['quantity'] + item.quantity
            update_result = client.update('cart_items', 
                {'quantity': new_quantity}, 
                {'id': f'eq.{existing["id"]}'}
            )
            if 'data' in update_result:
                return update_result['data'][0]
            else:
                raise HTTPException(status_code=500, detail="Failed to update cart item")
        else:
            # Add new item
            item_data = {
                "cart_id": cart_id,
                "product_id": item.product_id,
                "quantity": item.quantity
            }
            result = client.insert('cart_items', item_data)
            if 'data' in result:
                return result['data'][0]
            else:
                raise HTTPException(status_code=500, detail=f"Database error: {result.get('error', 'Unknown error')}")
                
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding to cart: {str(e)}")

@router.delete("/items/{item_id}")
async def remove_from_cart(
    item_id: int,
    current_user: dict = Depends(get_current_user)
):
    """Remove item from cart"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        # Verify item belongs to user's cart
        cart_result = client.select('cart', '*', {'user_id': f'eq.{current_user["id"]}'})
        if 'data' in cart_result and cart_result['data']:
            cart_id = cart_result['data'][0]['id']
            
            # Delete item
            result = client.delete('cart_items', {'id': f'eq.{item_id}', 'cart_id': f'eq.{cart_id}'})
            if 'data' in result:
                return {"message": "Item removed from cart"}
            else:
                raise HTTPException(status_code=404, detail="Item not found in cart")
        else:
            raise HTTPException(status_code=404, detail="Cart not found")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error removing from cart: {str(e)}")

@router.put("/items/{item_id}")
async def update_cart_item(
    item_id: int,
    quantity: int,
    current_user: dict = Depends(get_current_user)
):
    """Update cart item quantity"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        if quantity <= 0:
            # Remove item if quantity is 0 or negative
            return await remove_from_cart(item_id, current_user)
        
        # Verify item belongs to user's cart
        cart_result = client.select('cart', '*', {'user_id': f'eq.{current_user["id"]}'})
        if 'data' in cart_result and cart_result['data']:
            cart_id = cart_result['data'][0]['id']
            
            # Update item quantity
            result = client.update('cart_items', 
                {'quantity': quantity}, 
                {'id': f'eq.{item_id}', 'cart_id': f'eq.{cart_id}'}
            )
            if 'data' in result:
                return result['data'][0]
            else:
                raise HTTPException(status_code=404, detail="Item not found in cart")
        else:
            raise HTTPException(status_code=404, detail="Cart not found")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating cart item: {str(e)}")
