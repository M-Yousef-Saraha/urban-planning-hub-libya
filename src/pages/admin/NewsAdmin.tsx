import React, { useEffect, useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import api from '@/lib/api';

type NewsItem = { id: string; title: string; content: string; createdAt: string; updatedAt: string };

const NewsAdmin = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/news');
      if (res.data?.success) setItems(res.data.data.news || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  const save = async () => {
    if (!title || !content) return alert('Title and content required');
    try {
      const payload = { title, content };
      const res = editingId
        ? await api.put(`/api/news/${editingId}`, payload)
        : await api.post('/api/news', payload);
      if (res.data?.success) {
        await fetchNews();
        resetForm();
      } else {
        alert(res.data?.error || 'Failed');
      }
    } catch (e) {
      console.error(e);
      alert('Error');
    }
  };

  const edit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this news item?')) return;
    try {
      const res = await api.delete(`/api/news/${id}`);
  if (res.data?.success) fetchNews();
  else alert(res.data?.error || 'Failed');
    } catch (e) {
      console.error(e);
      alert('Error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">إدارة الأخبار</h2>
      </div>

      <div className="mb-4 p-4 border rounded bg-gray-50">
        <input className="w-full mb-2 p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <RichTextEditor value={content} onChange={setContent} placeholder="Write news content..." />
        <div className="mt-2 flex gap-2">
          <button onClick={save} className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
          <button onClick={resetForm} className="btn">Reset</button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Existing News</h3>
        {loading && <div>Loading...</div>}
        {!loading && items.length === 0 && <div>No news yet</div>}
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="p-2 border rounded bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-gray-500">{new Date(it.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => edit(it)} className="btn">Edit</button>
                  <button onClick={() => remove(it.id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
              <div className="mt-2 prose max-w-full" dangerouslySetInnerHTML={{ __html: it.content }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsAdmin;
