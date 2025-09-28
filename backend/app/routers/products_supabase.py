"""
Router Products avec Supabase
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.database import get_supabase_client
from app.schemas import ProductOut

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductOut])
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None
):
    """Get all products with optional filtering"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        # Build filters
        filters = {}
        if category:
            filters['category'] = f'eq.{category}'
        if min_price is not None:
            filters['price'] = f'gte.{min_price}'
        if max_price is not None:
            if 'price' in filters:
                filters['price'] = f'and(gte.{min_price},lte.{max_price})'
            else:
                filters['price'] = f'lte.{max_price}'
        
        # Get products from Supabase
        result = client.select('products', '*', filters, limit=limit)
        
        if 'data' in result:
            products = result['data']
            # Handle None values and add default category
            for product in products:
                if product.get('image_url') is None:
                    product['image_url'] = ""
                if product.get('category') is None:
                    # Assign category based on product name
                    name = product.get('name', '').lower()
                    if any(word in name for word in ['iphone', 'macbook', 'airpods', 'laptop', 'phone', 'computer']):
                        product['category'] = 'Electronics'
                    elif any(word in name for word in ['nike', 'shoes', 'shirt', 'pants', 'clothing']):
                        product['category'] = 'Clothing'
                    else:
                        product['category'] = 'General'
            return products
        else:
            raise HTTPException(status_code=500, detail=f"Database error: {result.get('error', 'Unknown error')}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products: {str(e)}")

@router.get("/{product_id}", response_model=ProductOut)
async def get_product(product_id: int):
    """Get a specific product by ID"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        result = client.select('products', '*', {'id': f'eq.{product_id}'})
        
        if 'data' in result and result['data']:
            product = result['data'][0]
            if product.get('image_url') is None:
                product['image_url'] = ""
            return product
        else:
            raise HTTPException(status_code=404, detail="Product not found")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching product: {str(e)}")

@router.get("/category/{category}")
async def get_products_by_category(category: str):
    """Get products by category"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        result = client.select('products', '*', {'category': f'eq.{category}'})
        
        if 'data' in result:
            products = result['data']
            for product in products:
                if product.get('image_url') is None:
                    product['image_url'] = ""
            return products
        else:
            raise HTTPException(status_code=500, detail=f"Database error: {result.get('error', 'Unknown error')}")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products: {str(e)}")

@router.get("/search/")
async def search_products(q: str = Query(..., min_length=1)):
    """Search products by name"""
    try:
        client = get_supabase_client()
        if not client:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        # Note: Supabase doesn't have built-in text search, so we'll filter by name containing the query
        result = client.select('products', '*')
        
        if 'data' in result:
            products = result['data']
            # Handle None image_url values and filter products
            for product in products:
                if product.get('image_url') is None:
                    product['image_url'] = ""
            
            filtered_products = [
                product for product in products 
                if q.lower() in product.get('name', '').lower()
            ]
            return filtered_products
        else:
            raise HTTPException(status_code=500, detail=f"Database error: {result.get('error', 'Unknown error')}")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching products: {str(e)}")
