"use client"

import { useEffect, useState } from "react"

export default function Dashboard(){

  const [products,setProducts] = useState<any[]>([])
  const [product_name,setProductName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setQuantity] = useState("")
  const [token,setToken] = useState("")
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [editId,setEditId] = useState<number | null>(null)

  const loadProducts = (t:any)=>{

    fetch("http://127.0.0.1:8000/api/products/",{
      headers:{ Authorization:`Bearer ${t}` }
    })
    .then(res=>res.json())
    .then(data=>{

      if(Array.isArray(data)){
        setProducts(data)
      }else{
        setProducts(data.results || [])
      }

    })

  }

  useEffect(()=>{

    const t = localStorage.getItem("token")

    if(t){
      setToken(t)
      loadProducts(t)
    }

  },[])

  const resetForm = ()=>{
    setProductName("")
    setDescription("")
    setPrice("")
    setQuantity("")
    setEditId(null)
  }

  const addOrUpdateProduct = async (e:any)=>{
    e.preventDefault()

    setError("")
    setSuccess("")

    if(!product_name || !description || !price || !quantity){
      setError("All fields are required")
      return
    }

    const url = editId
       ? `http://127.0.0.1:8000/api/products/${editId}/update/`
      : "http://127.0.0.1:8000/api/products/add/"

    const method = editId ? "PUT" : "POST"

    try{

      const res = await fetch(url,{
        method:method,
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          product_name,
          description,
          price,
          quantity:Number(quantity)
        })
      })

      const data = await res.json()

      if(res.ok){

        setSuccess(editId ? "Product Updated Successfully" : "Product Added Successfully")

        resetForm()

        loadProducts(token)

      }else{

        setError(JSON.stringify(data))

      }

    }
    catch{
      setError("Server error")
    }

  }

  const deleteProduct = async (id:number)=>{

    if(!confirm("Delete this product?")) return

    try{

      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/delete/`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      if(res.ok){

        setSuccess("Product Deleted Successfully")

        loadProducts(token)

      }else{

        const data = await res.text()
        console.log(data)

        setError("Delete failed")

      }

    }catch{

      setError("Server error during delete")

    }

  }

  const editProduct = (p:any)=>{

    setEditId(p.id)

    setProductName(p.product_name)
    setDescription(p.description)
    setPrice(p.price)
    setQuantity(p.quantity)

    window.scrollTo({top:0,behavior:"smooth"})
  }

  return(

    <div style={{
      minHeight:"100vh",
      background:"#f5f6fa",
      padding:"40px",
      fontFamily:"Arial"
    }}>

      <div style={{maxWidth:"1000px",margin:"auto"}}>

        <h1 style={{marginBottom:"20px"}}>Vendor Dashboard</h1>

        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}

        {/* Add / Update Form */}

        <div style={cardStyle}>

          <h2>{editId ? "Update Product" : "Add Product"}</h2>

          <form onSubmit={addOrUpdateProduct}>

            <input
            placeholder="Product Name"
            value={product_name}
            onChange={(e)=>setProductName(e.target.value)}
            style={inputStyle}
            />

            <input
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            style={inputStyle}
            />

            <div style={{display:"flex",gap:"10px"}}>

              <input
              placeholder="Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              style={{...inputStyle,flex:1}}
              />

              <input
              placeholder="Quantity"
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
              style={{...inputStyle,flex:1}}
              />

            </div>

            <button style={btnStyle}>
              {editId ? "Update Product" : "Add Product"}
            </button>

            {editId && (
              <button
              type="button"
              onClick={resetForm}
              style={cancelBtn}
              >
                Cancel
              </button>
            )}

          </form>

        </div>

        {/* Product Table */}

        <div style={cardStyle}>

          <h2>Your Products</h2>

          {products.length===0 ? (
            <p>No products added yet</p>
          ):(

            <table style={{width:"100%",borderCollapse:"collapse"}}>

              <thead>

                <tr style={{background:"#f1f3f5"}}>

                  <th style={th}>Name</th>
                  <th style={th}>Description</th>
                  <th style={th}>Price</th>
                  <th style={th}>Qty</th>
                  <th style={th}>Actions</th>

                </tr>

              </thead>

              <tbody>

                {products.map((p:any)=>(

                  <tr key={p.id}>

                    <td style={td}>{p.product_name}</td>
                    <td style={td}>{p.description}</td>
                    <td style={td}>₹{p.price}</td>
                    <td style={td}>{p.quantity}</td>

                    <td style={td}>

                      <button
                      onClick={()=>editProduct(p)}
                      style={editBtn}
                      >
                        Edit
                      </button>

                      <button
                      onClick={()=>deleteProduct(p.id)}
                      style={deleteBtn}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>

  )
}

const cardStyle={
  background:"white",
  padding:"25px",
  borderRadius:"8px",
  boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
  marginBottom:"25px"
}

const inputStyle={
  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  border:"1px solid #ddd",
  borderRadius:"6px"
}

const btnStyle={
  background:"#2c7be5",
  color:"white",
  border:"none",
  padding:"10px 18px",
  borderRadius:"6px",
  cursor:"pointer",
  marginRight:"10px"
}

const cancelBtn={
  background:"#6c757d",
  color:"white",
  border:"none",
  padding:"10px 18px",
  borderRadius:"6px",
  cursor:"pointer"
}

const editBtn={
  background:"#f39c12",
  color:"white",
  border:"none",
  padding:"6px 12px",
  marginRight:"5px",
  borderRadius:"5px",
  cursor:"pointer"
}

const deleteBtn={
  background:"#e74c3c",
  color:"white",
  border:"none",
  padding:"6px 12px",
  borderRadius:"5px",
  cursor:"pointer"
}

const th={
  padding:"12px",
  borderBottom:"2px solid #ddd",
  textAlign:"left"
}

const td={
  padding:"10px",
  borderBottom:"1px solid #eee"
}

const errorStyle={
  background:"#ffe5e5",
  color:"#c0392b",
  padding:"10px",
  borderRadius:"6px",
  marginBottom:"15px"
}

const successStyle={
  background:"#e8f8f5",
  color:"#27ae60",
  padding:"10px",
  borderRadius:"6px",
  marginBottom:"15px"
}