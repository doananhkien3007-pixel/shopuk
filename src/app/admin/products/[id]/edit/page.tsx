"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    price: '',
    thumbnail_url: '',
    description: '',
    short_desc: '',
    is_active: true
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', resolvedParams.id).single();
        if (error) throw error;
        
        if (data) {
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            price: data.price ? String(Math.round(data.price / 10000)) : '',
            thumbnail_url: data.thumbnail_url || '',
            description: data.description || '',
            short_desc: data.short_desc || '',
            is_active: data.is_active
          });
        }
      } catch (err) {
        console.error('Lỗi lấy dữ liệu:', err);
        alert('Không tìm thấy sản phẩm!');
        router.push('/admin/products');
      } finally {
        setFetching(false);
      }
    }
    loadProduct();
  }, [resolvedParams.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('products').update({
        title: formData.title,
        slug: formData.slug,
        price: parseInt(formData.price) * 10000,
        thumbnail_url: formData.thumbnail_url,
        description: formData.description,
        short_desc: formData.short_desc,
        is_active: formData.is_active,
      }).eq('id', resolvedParams.id);

      if (error) throw error;
      
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
      alert('Không thể cập nhật sản phẩm!');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h1>
        <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-black">
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black" />
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn (Slug) *</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black" />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá ($) *</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black" />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Ảnh Thumbnail *</label>
            <input required type="url" name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
          <textarea name="short_desc" value={formData.short_desc} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"></textarea>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded" />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">Cho phép hiển thị trên web (Đang bán)</label>
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 font-medium text-sm">
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
