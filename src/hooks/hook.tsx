import axios from 'axios';
import {useEffect, useState} from 'react'

import {IProduct} from '../models'
import { AxiosError } from 'axios';


export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);  
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=15');
        setProducts(response.data)
        setLoading(false)
      } catch (e: unknown) {
        const error = e as AxiosError
        setLoading(false)
        setError(error.message)
      }
      
      
    }
   
    useEffect(() => {
      fetchProducts()
    }, [])
   
    return {products, loading, error}
}