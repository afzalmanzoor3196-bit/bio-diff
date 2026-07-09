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
  description: '',
  customCategory: '',
}

const emptyStoryForm = {
  title: '',
}

const CATEGORY_OPTIONS = [
  'HYPERPIGMENTATION',
  'ACNE & BREAKOUTS',
  'DRY & DEHYDRATED SKIN',
  'KOREAN GLASS SKIN',
  'ANTI-AGING',
  'SENSITIVE SKIN',
  'OILY SKIN',
  'NORMAL SKIN',
]

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
  const [productSuccess, setProductSuccess] = useState('')
  const [activeSection, setActiveSection] = useState('products') // 'products' | 'stories'
  const [imagePreview, setImagePreview] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null) // id of product to confirm delete

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
        description: editingProduct.description || '',
      })
      setImagePreview(editingProduct.image || '')
    } else {
      setProductForm(emptyProductForm)
      setImagePreview('')
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
      setImagePreview('')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setUploadedImage(reader.result || '')
      setImagePreview(reader.result || '')
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
    setProductForm((current) => {
      const updated = { ...current, [name]: value }
      // Auto-generate ID from name when not editing an existing product and ID hasn't been manually changed
      if (name === 'name' && !editingProduct) {
        const autoId = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        updated.id = autoId
      }
      return updated
    })
  }

  const handleStoryFieldChange = (event) => {
    const { name, value } = event.target
    setStoryForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const imageValue = uploadedImage || productForm.image.trim()

    if (!imageValue) {
      alert('Please upload a product image or enter an image URL.')
      return
    }

    const categoryValue = productForm.category === '__custom__'
      ? (productForm.customCategory || '').trim().toUpperCase()
      : productForm.category.trim().toUpperCase()

    if (!categoryValue) {
      alert('Please select or enter a category.')
      return
    }

    const productPayload = {
      id: productForm.id.trim().replace(/\s+/g, '-').toLowerCase(),
      category: categoryValue,
      badge: productForm.badge.trim() || null,
      image: imageValue,
      name: productForm.name.trim(),
      price: productForm.price.trim(),
      priceValue: Number(String(productForm.priceValue).trim()) || 0,
      description: productForm.description.trim(),
    }

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productPayload)
      setEditingProduct(null)
      setProductSuccess('✅ Product updated successfully!')
    } else {
      onAddProduct(productPayload)
      setProductSuccess('✅ Product added successfully! It is now visible on the homepage.')
    }

    setProductForm(emptyProductForm)
    setUploadedImage('')
    setUploadFileName('')
    setImagePreview('')
    window.setTimeout(() => setProductSuccess(''), 4000)
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
      setStorySuccess('✅ Story updated! It is now visible on the homepage.')
    } else {
      onAddStory(storyPayload)
      setStorySuccess('✅ Story added! It is now visible on the homepage.')
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
    setProductSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startEditStory = (story) => {
    setEditingProduct(null)
    setEditingStory(story)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setEditingStory(null)
    setProductForm(emptyProductForm)
    setStoryForm(emptyStoryForm)
    setUploadedImage('')
    setUploadFileName('')
    setImagePreview('')
    setUploadedVideo('')
    setUploadVideoName('')
    setProductSuccess('')
    setStoryError('')
    setStorySuccess('')
  }

  const confirmDelete = (id) => {
    setDeleteConfirm(id)
  }

  const executeDelete = () => {
    if (deleteConfirm) {
      onDeleteProduct(deleteConfirm)
      setDeleteConfirm(null)
    }
  }

  return (
    <main className="admin-dashboard-page">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button className="admin-modal-delete" onClick={executeDelete}>Yes, Delete</button>
              <button className="admin-modal-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-dashboard-header">
        <div>
          <h1>🛡️ Admin Dashboard</h1>
          <p>Manage your BioDiff products and stories.</p>
        </div>
        <div className="admin-header-right">
          <span className="admin-stats">
            {products.length} Products · {stories.length} Stories
          </span>
          <button className="admin-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="admin-section-tabs">
        <button
          className={`admin-section-tab ${activeSection === 'products' ? 'active' : ''}`}
          onClick={() => { setActiveSection('products'); cancelEdit() }}
        >
          📦 Products
        </button>
        <button
          className={`admin-section-tab ${activeSection === 'stories' ? 'active' : ''}`}
          onClick={() => { setActiveSection('stories'); cancelEdit() }}
        >
          🎬 Stories
        </button>
      </div>

      {/* === PRODUCTS SECTION === */}
      {activeSection === 'products' && (
        <>
          <section className="admin-dashboard-form-section">
            <h2>{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
            {productSuccess && <div className="admin-story-success">{productSuccess}</div>}
            <form className="admin-dashboard-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <label>
                  Product Name *
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. BioDiff Glutathione Brightening Cream"
                    value={productForm.name}
                    onChange={handleProductFieldChange}
                  />
                </label>

                <label>
                  Product ID *
                  <input
                    name="id"
                    type="text"
                    required
                    placeholder="e.g. biodiff-brightening-cream"
                    value={productForm.id}
                    onChange={handleProductFieldChange}
                    disabled={Boolean(editingProduct)}
                  />
                  {!editingProduct && (
                    <span className="admin-field-hint">Auto-generated from name if left unchanged after typing name</span>
                  )}
                </label>

                <label>
                  Category *
                  <select
                    name="category"
                    required
                    value={productForm.category}
                    onChange={handleProductFieldChange}
                  >
                    <option value="">-- Select Category --</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  <option value="__custom__">Other (type below)</option>
                  </select>
                  {productForm.category === '__custom__' && (
                    <input
                      name="category"
                      type="text"
                      placeholder="Enter custom category (e.g. SUNCARE)"
                      value={productForm.customCategory || ''}
                      onChange={(e) => setProductForm((cur) => ({ ...cur, category: e.target.value || '__custom__', customCategory: e.target.value }))}
                      style={{ marginTop: '8px' }}
                    />
                  )}
                </label>

                <label>
                  Badge Label
                  <input
                    name="badge"
                    type="text"
                    placeholder="e.g. BEST SELLER 🔥 (optional)"
                    value={productForm.badge}
                    onChange={handleProductFieldChange}
                  />
                </label>

                <label>
                  Price Label *
                  <input
                    name="price"
                    type="text"
                    required
                    placeholder="e.g. Rs.1,299"
                    value={productForm.price}
                    onChange={handleProductFieldChange}
                  />
                </label>

                <label>
                  Price (Numeric) *
                  <input
                    name="priceValue"
                    type="number"
                    required
                    placeholder="e.g. 1299"
                    value={productForm.priceValue}
                    onChange={handleProductFieldChange}
                    min="0"
                  />
                </label>
              </div>

              <label className="admin-full-width">
                Short Description (shown on product page)
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe the product briefly — this will appear as the product tagline on the product details page."
                  value={productForm.description}
                  onChange={handleProductFieldChange}
                />
              </label>

              <div className="admin-image-upload-row">
                <div className="admin-image-upload-controls">
                  <label>
                    Upload Product Image *
                    <input name="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
                    {uploadFileName && <div className="upload-file-name">✔ Selected: {uploadFileName}</div>}
                  </label>
                  <label>
                    — OR — Image URL
                    <input
                      name="image"
                      type="text"
                      placeholder="https://example.com/product-image.jpg"
                      value={productForm.image}
                      onChange={handleProductFieldChange}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className="admin-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <span>Preview</span>
                  </div>
                )}
              </div>

              <div className="admin-form-actions">
                <button type="submit">{editingProduct ? '💾 Save Changes' : '➕ Add Product'}</button>
                {editingProduct && (
                  <button type="button" className="admin-cancel" onClick={cancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="admin-dashboard-list">
            <h2>📦 Current Products ({products.length})</h2>
            {products.length === 0 ? (
              <p className="admin-empty-msg">No products yet. Add your first product above.</p>
            ) : (
              <div className="admin-products-grid">
                {products.map((product) => (
                  <article key={product.id} className="admin-product-card">
                    <div className="admin-card-image-wrap">
                      {product.badge && <span className="admin-card-badge">{product.badge}</span>}
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="admin-card-info">
                      <p className="admin-product-name">{product.name}</p>
                      <p className="admin-product-category">{product.category}</p>
                      <p className="admin-product-price">{product.price}</p>
                    </div>
                    <div className="admin-card-actions">
                      <button type="button" className="admin-btn-edit" onClick={() => startEditProduct(product)}>
                        ✏️ Edit
                      </button>
                      <button type="button" className="admin-btn-delete" onClick={() => confirmDelete(product.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* === STORIES SECTION === */}
      {activeSection === 'stories' && (
        <>
          <section className="admin-dashboard-form-section">
            <h2>{editingStory ? '✏️ Edit Story' : '➕ Add New Story'}</h2>
            {storyError && <div className="admin-story-error">⚠️ {storyError}</div>}
            {storySuccess && <div className="admin-story-success">{storySuccess}</div>}
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
                <button type="submit">{editingStory ? '💾 Save Story' : '➕ Add Story'}</button>
                {editingStory && (
                  <button type="button" className="admin-cancel" onClick={cancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="admin-dashboard-list">
            <h2>🎬 Current Story Videos ({stories.length})</h2>
            {stories.length === 0 ? (
              <p className="admin-empty-msg">No stories yet. Add your first story above.</p>
            ) : (
              <div className="admin-stories-grid">
                {stories.map((story) => (
                  <article key={story.id} className="admin-story-card">
                    {story.video ? (
                      <video src={story.video} controls muted loop />
                    ) : (
                      <img src={story.poster} alt={`Story ${story.id}`} />
                    )}
                    <div className="admin-card-info">
                      <p className="admin-product-name">{story.title || `Story ${story.id}`}</p>
                      <p className="admin-product-category">ID: {story.id}</p>
                    </div>
                    <div className="admin-card-actions">
                      <button type="button" className="admin-btn-edit" onClick={() => startEditStory(story)}>
                        ✏️ Edit
                      </button>
                      <button type="button" className="admin-btn-delete" onClick={() => onDeleteStory(story.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  )
}

export default AdminDashboard
