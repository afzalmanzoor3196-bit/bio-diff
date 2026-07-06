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
  posterUrl: '',
  videoUrl: '',
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
      setStoryForm({
        title: editingStory.title || '',
        posterUrl: editingStory.poster || '',
        videoUrl: editingStory.video?.startsWith('blob:') ? '' : editingStory.video || '',
      })
    } else {
      setStoryForm(emptyStoryForm)
    }

    setUploadedVideo('')
    setUploadVideoName('')
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

    const reader = new FileReader()
    reader.onload = () => {
      setUploadedVideo(reader.result || '')
      setUploadVideoName(file.name)
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
    const storyVideo = uploadedVideo || storyForm.videoUrl.trim()
    if (!storyVideo) return

    const storyPayload = {
      id: editingStory?.id || `story-${Date.now()}`,
      title: storyForm.title.trim() || uploadVideoName || `Story ${Date.now()}`,
      poster: storyForm.posterUrl.trim() || '/images/stories/story-1.jpg',
      video: storyVideo,
    }

    if (editingStory) {
      onUpdateStory(editingStory.id, storyPayload)
      setEditingStory(null)
    } else {
      onAddStory(storyPayload)
    }

    setStoryForm(emptyStoryForm)
    setUploadedVideo('')
    setUploadVideoName('')
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
    setStoryForm({
      title: story.title || '',
      posterUrl: story.poster || '',
      videoUrl: story.video?.startsWith('blob:') ? '' : story.video || '',
    })
    setUploadedVideo('')
    setUploadVideoName('')
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
        <h2>{editingStory ? 'Edit Story Video' : 'Add New Story Video'}</h2>
        <form className="admin-dashboard-form" onSubmit={handleStorySubmit}>
          <label>
            Story Title
            <input
              name="title"
              type="text"
              required
              placeholder="Story title"
              value={storyForm.title}
              onChange={handleStoryFieldChange}
            />
          </label>
          <label>
            Poster Image URL
            <input
              name="posterUrl"
              type="text"
              placeholder="Poster image URL or local path"
              value={storyForm.posterUrl}
              onChange={handleStoryFieldChange}
            />
          </label>
          <label>
            Upload Video
            <input name="videoFile" type="file" accept="video/*" onChange={handleVideoChange} />
            {uploadVideoName && <div className="upload-file-name">Selected: {uploadVideoName}</div>}
          </label>
          <label>
            Or video URL
            <input
              name="videoUrl"
              type="text"
              placeholder="Remote video URL if not uploading"
              value={storyForm.videoUrl}
              onChange={handleStoryFieldChange}
            />
          </label>
          <div className="admin-form-actions">
            <button type="submit">{editingStory ? 'Save Story' : 'Add Story Video'}</button>
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
