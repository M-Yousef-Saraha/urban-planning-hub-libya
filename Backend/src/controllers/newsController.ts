import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const newsFile = path.join(dataDir, 'news.json');

function readNews() {
  if (!fs.existsSync(newsFile)) return [];
  try {
    const raw = fs.readFileSync(newsFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    console.error('Failed to read news file', e);
    return [];
  }
}

function writeNews(items: any[]) {
  fs.writeFileSync(newsFile, JSON.stringify(items, null, 2), 'utf8');
}

export const listNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = readNews();
    res.json({ success: true, data: { news: items } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const createNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ success: false, error: 'Title and content required' });
      return;
    }
    const items = readNews();
    const id = `news_${Date.now()}`;
    const item = { id, title, content, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    items.unshift(item);
    writeNews(items);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const updateNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const items = readNews();
    const idx = items.findIndex((i: any) => i.id === id);
    if (idx === -1) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    items[idx] = { ...items[idx], title: title ?? items[idx].title, content: content ?? items[idx].content, updatedAt: new Date().toISOString() };
    writeNews(items);
    res.json({ success: true, data: items[idx] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deleteNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    let items = readNews();
    const idx = items.findIndex((i: any) => i.id === id);
    if (idx === -1) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    const [removed] = items.splice(idx, 1);
    writeNews(items);
    res.json({ success: true, data: removed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
