import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, X, Save, Layout, Image as ImageIcon, Award, Users, AlignLeft } from 'lucide-react';
import * as galleryApi from '../apiIntegration/Gallery.api';

const GalleryAdmin = () => {
  // 1. STATE FOR PAGE CONTENT (Title & Description)
  const [pageContent, setPageContent] = useState({
    heroTitle: "Gallery",
    heroDesc: "Every year, hundreds of young, dynamic men and women step into nursing colleges across the nation with a dream. A dream to serve the sick, to help the helpless, and to master the art of clinical excellence.",
    heroButtonText: "CONTACT NOW",
    archiveTitle: "Visual Archive",
    archiveSub: "Our Clinical Excellence",
    archiveDesc: "Witness the journey of 500+ successful nursing professionals across the globe.",
    successYears: 12,
    captures: 25,
    heroImage: '',
    secondImage: ''
  });

  // 2. STATE FOR GALLERY ITEMS
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', subtitle: 'Skill Mastery', category: 'Clinical Training', imageUrl: '' });

  // Load from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [itemsData, contentData] = await Promise.all([
          galleryApi.getAllItems(),
          galleryApi.getPageContent()
        ]);
        setItems(itemsData);
        setPageContent(contentData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save on Change
  useEffect(() => {
    localStorage.setItem('flygulf_gallery_data', JSON.stringify(items));
    localStorage.setItem('flygulf_page_settings', JSON.stringify(pageContent));
  }, [items, pageContent]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, imageUrl: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPageContent({ ...pageContent, heroImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSecondImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPageContent({ ...pageContent, secondImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await galleryApi.updateItem(editingId, formData);
        setItems(items.map(item => item.id === editingId ? updated : item));
      } else {
        const created = await galleryApi.createItem(formData);
        setItems([...items, created]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await galleryApi.deleteItem(id);
      setItems(items.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSavePageContent = async () => {
    try {
      await galleryApi.updatePageContent(pageContent);
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', subtitle: 'Skill Mastery', category: 'Clinical Training', imageUrl: '' });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f1f5f9] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* SECTION 1: HEADER & DESCRIPTION EDITOR */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Layout size={24} />
              <h2 className="text-xl font-black uppercase">Main Page Content</h2>
            </div>
            <button onClick={handleSavePageContent} className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 flex items-center gap-2">
              <Save size={18} /> Save
            </button>
          </div>
          <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Main Hero Title</label>
                <input 
                  type="text"
                  value={pageContent.heroTitle}
                  onChange={(e) => setPageContent({...pageContent, heroTitle: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Hero Description</label>
                <textarea 
                  rows="4"
                  value={pageContent.heroDesc}
                  onChange={(e) => setPageContent({...pageContent, heroDesc: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Button Text</label>
                <input 
                  type="text"
                  value={pageContent.heroButtonText}
                  onChange={(e) => setPageContent({...pageContent, heroButtonText: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Hero Background Image</label>
                <div className="relative h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 overflow-hidden">
                  <input type="file" accept="image/*" onChange={handleHeroImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  {pageContent.heroImage ? (
                    <img src={pageContent.heroImage} alt="Hero" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <div className="text-center"><ImageIcon className="mx-auto mb-1" /><p className="text-xs">Upload Hero Image</p></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SECOND SECTION EDITOR */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center gap-2 text-purple-700">
              <Layout size={24} />
              <h2 className="text-xl font-black uppercase">Second Section (Visual Archive)</h2>
            </div>
            <button onClick={handleSavePageContent} className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 flex items-center gap-2">
              <Save size={18} /> Save
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Archive Title</label>
                <input 
                  type="text"
                  value={pageContent.archiveTitle}
                  onChange={(e) => setPageContent({...pageContent, archiveTitle: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Archive Subtitle</label>
                <input 
                  type="text"
                  value={pageContent.archiveSub}
                  onChange={(e) => setPageContent({...pageContent, archiveSub: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Archive Description</label>
                <textarea 
                  rows="3"
                  value={pageContent.archiveDesc}
                  onChange={(e) => setPageContent({...pageContent, archiveDesc: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-purple-600 mb-2"><Users size={18}/> <span className="text-[10px] font-bold uppercase">Captures</span></div>
                  <input type="number" value={pageContent.captures} onChange={(e) => setPageContent({...pageContent, captures: e.target.value})} className="bg-transparent text-3xl font-black w-full outline-none" />
                </div>
                <div className="bg-blue-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-blue-600 mb-2"><Award size={18}/> <span className="text-[10px] font-bold uppercase">Years</span></div>
                  <input type="number" value={pageContent.successYears} onChange={(e) => setPageContent({...pageContent, successYears: e.target.value})} className="bg-transparent text-3xl font-black w-full outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Section Image</label>
                <div className="relative h-48 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 overflow-hidden">
                  <input type="file" accept="image/*" onChange={handleSecondImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  {pageContent.secondImage ? (
                    <img src={pageContent.secondImage} alt="Second" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <div className="text-center"><ImageIcon className="mx-auto mb-1" size={32} /><p className="text-xs">Upload Section Image</p></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: VISUAL ARCHIVE CRUD */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{pageContent.archiveTitle}</h2>
              <p className="text-blue-600 font-bold italic">{pageContent.archiveSub}</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center gap-2"
            >
              <Plus size={20} /> Add Skill Entry
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => { setFormData(item); setEditingId(item.id); setIsModalOpen(true); }} className="bg-white p-3 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"><Edit3 size={18}/></button>
                      <button onClick={() => handleDeleteItem(item.id)} className="bg-white p-3 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">{item.category}</p>
                  <h4 className="font-bold text-slate-800 text-lg leading-tight">{item.subtitle} #{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      

      {/* MODAL FOR GALLERY ENTRY */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <form onSubmit={handleGallerySubmit} className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900">Add Skill Entry</h3>
                <button type="button" onClick={closeModal} className="text-slate-300 hover:text-slate-900"><X /></button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 block mb-2">Skill Sequence (e.g. 10)</label>
                <input required name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-4 outline-none border-2 border-transparent focus:border-blue-500" placeholder="Number Only" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 block mb-2">Image Mastery Photo</label>
                <div className="relative h-32 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center">
                            <ImageIcon className="mx-auto text-slate-300 mb-1" />
                            <p className="text-[10px] text-slate-400 font-bold">UPLOAD PHOTO</p>
                        </div>
                    )}
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all">
                {editingId ? 'Update Entry' : 'Save New Entry'}
              </button>
            </div>
          </form>
        </div>

      )}
   </div>

  );
};

export default GalleryAdmin;