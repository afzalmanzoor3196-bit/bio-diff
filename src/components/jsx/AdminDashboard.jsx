import { useEffect, useState } from 'react'
import '../css/AdminDashboard.css'

const emptyProductForm = {
  id: '',
  category: '',
  badge: '',
  image: '',
  name: '',
  price: '',
  priceValue: '',
}

const emptyStoryForm = {
  title: '',
}

function AdminDashboard({ products, onAddProduct, stories, onAddStory, onUpdateProduct, onDeleteProduct, onUpdateStory, onDeleteStory, onLogout }) {
  const [uploadedImage, setUploadedImage] = useState('')
  const [uploadFileName, setUploadFileName] = useState('')
  const [uploadedVideo, setUploadedVideo] = useState('')
  const [uploadVideoName, setUploadVideoName] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingStory, setEditingStory] = useState(null)
  const [productForm, setProductForm] = useState(emptyProductForm)
  const [storyForm, setStoryForm] = useState(emptyStoryForm)
  const [uploadedPoster, setUploadedPoster] = useState('')
  const [uploadPosterName, setUploadPosterName] = useState('')
  const [storyError, setStoryError] = useState('')
  const [storySuccess, setStorySuccess] = useState('')
  // Keep track of current blob URL so we can revoke it to free memory
  const videoBlobRef = { current: null }

  useEffect(() => {
    if (editingProduct) {
      setProductForm({
        id: editingProduct.id || '',
        category: editingProduct.category || '',
        badge: editingProduct.badge || '',
        image: editingProduct.image || '',
        name: editingProduct.name || '',
        price: editingProduct.price || '',
        priceValue: editingProduct.priceValue ?? '',
      })
    } else {
      setProductForm(emptyProductForm)
    }

    setUploadedImage('')
    setUploadFileName('')
  }, [editingProduct])

  useEffect(() => {
    if (editingStory) {
      setStoryForm({ title: editingStory.title || '' })
    } else {
      setStoryForm(emptyStoryForm)
    }

    setUploadedVideo('')
    setUploadVideoName('')
    setUploadedPoster('')
    setUploadPosterName('')
    setStoryError('')
    setStorySuccess('')
  }, [editingStory])

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setUploadedImage('')
      setUploadFileName('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setUploadedImage(reader.result || '')
      setUploadFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setUploadedVideo('')
      setUploadVideoName('')
      return
    }
    // Use blob URL — works with all browsers for video streaming
    // base64 data URIs are too large for video elements to load
    const blobUrl = URL.createObjectURL(file)
    setUploadedVideo(blobUrl)
    setUploadVideoName(file.name)
  }

  const handlePosterChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setUploadedPoster('')
      setUploadPosterName('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setUploadedPoster(reader.result || '')
      setUploadPosterName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const handleProductFieldChange = (event) => {
    const { name, value } = event.target
    setProductForm((current) => ({ ...current, [name]: value }))
  }

  const handleStoryFieldChange = (event) => {
    const { name, value } = event.target
    setStoryForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const imageValue = uploadedImage || productForm.image.trim()
    const productPayload = {
      id: productForm.id.trim().replace(/\s+/g, '-').toLowerCase(),
      category: productForm.category.trim(),
      badge: productForm.badge.trim() || null,
      image: imageValue,
      name: productForm.name.trim(),
      price: productForm.price.trim(),
      priceValue: Number(productForm.priceValue.trim()) || 0,
    }

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productPayload)
      setEditingProduct(null)
    } else {
      onAddProduct(productPayload)
    }

    setProductForm(emptyProductForm)
    setUploadedImage('')
    setUploadFileName('')
  }

  const handleStorySubmit = (event) => {
    event.preventDefault()
    setStoryError('')
    setStorySuccess('')

    if (!uploadedVideo && !uploadedPoster) {
      setStoryError('Please upload at least a poster image or a video from your PC.')
      return
    }

    const storyPayload = {
      id: editingStory?.id || `story-${Date.now()}`,
      title: storyForm.title.trim() || uploadVideoName || uploadPosterName || `Story ${Date.now()}`,
      poster: uploadedPoster || null,
      video: uploadedVideo || null,
    }

    if (editingStory) {
      onUpdateStory(editingStory.id, storyPayload)
      setEditingStory(null)
      setStorySuccess('Story updated! It is now visible on the homepage.')
    } else {
      onAddStory(storyPayload)
      setStorySuccess('Story added! It is now visible on the homepage.')
    }

    setStoryForm(emptyStoryForm)
    setUploadedVideo('')
    setUploadVideoName('')
    setUploadedPoster('')
    setUploadPosterName('')
    window.setTimeout(() => setStorySuccess(''), 5000)
  }

  const startEditProduct = (product) => {
    setEditingStory(null)
    setEditingProduct(product)
    setProductForm({
      id: product.id || '',
      category: product.category || '',
      badge: product.badge || '',
      image: product.image || '',
      name: product.name || '',
      price: product.price || '',
      priceValue: product.priceValue ?? '',
    })
    setUploadedImage('')
    setUploadFileName('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startEditStory = (story) => {
    setEditingProduct(null)
    setEditingStory(story)
    setStoryForm({ title: story.title || '' })
    setUploadedVideo('')
    setUploadVideoName('')
    setUploadedPoster('')
    setUploadPosterName('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setEditingStory(null)
    setProductForm(emptyProductForm)
    setStoryForm(emptyStoryForm)
    setUploadedImage('')
    setUploadFileName('')
    setUploadedVideo('')
    setUploadVideoName('')
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Add products to the site with the form below.</p>
        </div>
        <button className="admin-logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <section className="admin-dashboard-form-section">
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form className="admin-dashboard-form" onSubmit={handleSubmit}>
          <label>
            ID
            <input
              name="id"
              type="text"
              required
              placeholder="unique-product-id"
              value={productForm.id}
              onChange={handleProductFieldChange}
              disabled={Boolean(editingProduct)}
            />
          </label>
          <label>
            Name
            <input
              name="name"
              type="text"
              required
              placeholder="Product name"
              value={productForm.name}
              onChange={handleProductFieldChange}
            />
          </label>
          <label>
            Category
            <input
              name="category"
              type="text"
              required
              placeholder="Category name"
              value={productForm.category}
              onChange={handleProductFieldChange}
            />
          </label>
          <label>
            Badge
            <input
              name="badge"
              type="text"
              placeholder="Badge text or leave blank"
              value={productForm.badge}
              onChange={handleProductFieldChange}
            />
          </label>
          <label>
            Upload Image
            <input name="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
            {uploadFileName && <div className="upload-file-name">Selected: {uploadFileName}</div>}
          </label>
          <label>
            Image URL (optional if uploaded)
            <input
              name="image"
              type="text"
              placeholder="Use remote URL if not uploading"
              value={productForm.image}
              onChange={handleProductFieldChange}
            />
          </label>
          <label>
            Price label
            <input
              name="price"
              type="text"
              required
              placeholder="Rs.1,299"
              value={productForm.price}
              onChange={handleProductFieldChange}
            />
          </label>
          <label>
            Price numeric
            <input
              name="priceValue"
              type="number"
              required
              placeholder="1299"
              value={productForm.priceValue}
              onChange={handleProductFieldChange}
            />
          </label>
          <div className="admin-form-actions">
            <button type="submit">{editingProduct ? 'Save Product' : 'Add Product'}</button>
            {editingProduct && <button type="button" className="admin-cancel" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="admin-dashboard-form-section">
        <h2>{editingStory ? 'Edit Story' : 'Add New Story'}</h2>
        {storyError && <div className="admin-story-error">⚠️ {storyError}</div>}
        {storySuccess && <div className="admin-story-success">✅ {storySuccess}</div>}
        <form className="admin-dashboard-form" onSubmit={handleStorySubmit}>
          <label>
            Story Title (optional)
            <input
              name="title"
              type="text"
              placeholder="e.g. Customer Review, Before & After..."
              value={storyForm.title}
              onChange={handleStoryFieldChange}
            />
          </label>
          <label>
            Poster Image — Upload from PC
            <input name="posterFile" type="file" accept="image/*" onChange={handlePosterChange} />
            {uploadPosterName && <div className="upload-file-name">✔ Selected: {uploadPosterName}</div>}
          </label>
          <label>
            Story Video — Upload from PC
            <input name="videoFile" type="file" accept="video/*" onChange={handleVideoChange} />
            {uploadVideoName && <div className="upload-file-name">✔ Selected: {uploadVideoName}</div>}
          </label>
          <div className="admin-form-actions">
            <button type="submit">{editingStory ? 'Save Story' : 'Add Story'}</button>
            {editingStory && <button type="button" className="admin-cancel" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </section>


      <section className="admin-dashboard-list">
        <h2>Current Products</h2>
        <div className="admin-products-grid">
          {products.map((product) => (
            <article key={product.id} className="admin-product-card">
              <img src={product.image} alt={product.name} />
              <div>
                <p className="admin-product-name">{product.name}</p>
                <p className="admin-product-category">{product.category}</p>
                <p className="admin-product-price">{product.price}</p>
              </div>
              <div className="admin-card-actions">
                <button type="button" onClick={() => startEditProduct(product)}>Edit</button>
                <button type="button" onClick={() => onDeleteProduct(product.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-dashboard-list">
        <h2>Current Story Videos</h2>
        <div className="admin-stories-grid">
          {stories.map((story) => (
            <article key={story.id} className="admin-story-card">
              {story.video ? (
                <video src={story.video} controls muted loop />
              ) : (
                <img src={story.poster} alt={`Story ${story.id}`} />
              )}
              <div>
                <p className="admin-product-name">{story.title || `Story ${story.id}`}</p>
                <p className="admin-product-category">Story ID: {story.id}</p>
                <p className="admin-product-price">Poster: {story.poster}</p>
              </div>
              <div className="admin-card-actions">
                <button type="button" onClick={() => startEditStory(story)}>Edit</button>
                <button type="button" onClick={() => onDeleteStory(story.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard
