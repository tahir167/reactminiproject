import React, { useEffect, useState } from 'react';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';
import { enqueueSnackbar } from 'notistack';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        title2: '',
        description: '',
        price: '',
        stock: '',
        rating: '',
        imageUrl: '',
        category: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await controller.getAll(endpoints.products);
            setProducts(response);
        } catch (error) {
            console.error('Məhsullar gətirilərkən xəta baş verdi:', error);
            enqueueSnackbar('Məhsullar gətirilərkən xəta baş verdi.', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' }); 
        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.title.trim() && !selectedProduct) { 
            errors.title = 'Ad mütləqdir';
            isValid = false;
        } else if (formData.title.trim() && formData.title.length < 2) { 
             errors.title = 'Ad ən az 2 simvol olmalıdır';
             isValid = false;
        }


        if (!formData.title2.trim() && !selectedProduct) {
            errors.title2 = 'İkinci ad mütləqdir';
            isValid = false;
        } else if (formData.title2.trim() && formData.title2.length < 2) {
            errors.title2 = 'İkinci ad ən az 2 simvol olmalıdır';
            isValid = false;
        }


        if (!formData.description.trim() && !selectedProduct) {
            errors.description = 'Təsvir mütləqdir';
            isValid = false;
        } else if (formData.description.trim() && formData.description.length < 10) {
            errors.description = 'Təsvir ən az 10 simvol olmalıdır';
            isValid = false;
        }


        if (formData.price === '' && !selectedProduct) {
            errors.price = 'Qiymət mütləqdir';
            isValid = false;
        } else if (formData.price !== '' && (isNaN(formData.price) || parseFloat(formData.price) <= 0)) {
            errors.price = 'Qiymət müsbət rəqəm olmalıdır';
            isValid = false;
        }

        if (formData.stock === '' && !selectedProduct) { 
            errors.stock = 'Stok sayı mütləqdir';
            isValid = false;
        } else if (formData.stock !== '' && (isNaN(formData.stock) || parseInt(formData.stock) < 0 || !Number.isInteger(parseFloat(formData.stock)))) {
            errors.stock = 'Stok sayı tam və müsbət ədəd olmalıdır';
            isValid = false;
        }

        if (formData.rating === '' && !selectedProduct) { 
            errors.rating = 'Reytinq mütləqdir';
            isValid = false;
        } else if (formData.rating !== '' && (isNaN(formData.rating) || parseFloat(formData.rating) < 1 || parseFloat(formData.rating) > 5)) {
            errors.rating = 'Reytinq 1-5 arasında olmalıdır';
            isValid = false;
        }

        const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg|webp)(\?.*)?$/i; 

        if (!formData.imageUrl.trim() && !selectedProduct) { 
            errors.imageUrl = 'Şəkil URL-i mütləqdir';
            isValid = false;
        } else if (formData.imageUrl.trim() && !urlRegex.test(formData.imageUrl)) {
            errors.imageUrl = 'Keçərli bir şəkil URL-i olmalıdır (jpg, png, gif, bmp, svg, webp)';
            isValid = false;
        }


        if (!formData.category.trim() && !selectedProduct) { 
            errors.category = 'Kategoriya mütləqdir';
            isValid = false;
        }


        setFormErrors(errors);
        return isValid;
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu məhsulu silməyə əminsiniz?')) {
            try {
                await controller.delete(endpoints.products, id);
                setProducts(products.filter(product => product.id !== id));
                enqueueSnackbar('Məhsul uğurla silindi!', { variant: 'success' });
            } catch (error) {
                console.error('Məhsul silinərkən xəta baş verdi:', error);
                enqueueSnackbar('Məhsul silinərkən xəta baş verdi.', { variant: 'error' });
            }
        }
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        setFormData({
            title: product.title || '',
            title2: product.title2 || '',
            description: product.description || '',
            price: product.price || '',
            stock: product.stock || '',
            rating: product.rating || '',
            imageUrl: product.imageUrl || '',
            category: product.category || '',
        });
        setFormErrors({});
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
        setFormData({
            title: '',
            title2: '',
            description: '',
            price: '',
            stock: '',
            rating: '',
            imageUrl: '',
            category: '',
        });
        setFormErrors({}); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formIsValid = validateForm();

        if (!formIsValid) {
            enqueueSnackbar('Zəhmət olmasa, formadakı səhvləri düzəldin.', { variant: 'warning' });
            return;
        }

        try {
            const dataToSend = {};
            for (const key in formData) {
                if (selectedProduct) {
                    dataToSend[key] = formData[key];
                } else {
                    dataToSend[key] = formData[key];
                }
            }


            if (selectedProduct) {
                await controller.put(endpoints.products, selectedProduct.id, dataToSend);
                setProducts(products.map(p => (p.id === selectedProduct.id ? { ...p, ...dataToSend } : p)));
                enqueueSnackbar('Məhsul uğurla yeniləndi!', { variant: 'success' });
            } else {
                const newProduct = await controller.post(endpoints.products, dataToSend);
                setProducts([...products, { ...newProduct, id: newProduct.id }]);
                enqueueSnackbar('Məhsul uğurla əlavə edildi!', { variant: 'success' });
            }
            setIsModalOpen(false);
            setFormData({ 
                title: '', title2: '', description: '', price: '',
                stock: '', rating: '', imageUrl: '', category: '',
            });
            setFormErrors({}); 
        } catch (error) {
            console.error('Məhsul əməliyyatı zamanı xəta baş verdi:', error);
            enqueueSnackbar('Məhsul əməliyyatı zamanı xəta baş verdi.', { variant: 'error' });
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-[calc(100vh-9vh-20vh)]">
            <h1 className="text-3xl font-bold mb-6">Məhsul İdarəetmə Paneli</h1>

            <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-green-600 transition-colors"
            >
                Yeni Məhsul Əlavə Et
            </button>

            {loading ? (
                <p>Məhsullar yüklənir...</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600 text-sm leading-4 tracking-wider">
                                <th className="py-3 px-4 border-b">ID</th>
                                <th className="py-3 px-4 border-b">Şəkil</th>
                                <th className="py-3 px-4 border-b">Ad</th>
                                <th className="py-3 px-4 border-b">Qiymət</th>
                                <th className="py-3 px-4 border-b">Stok</th>
                                <th className="py-3 px-4 border-b">Reytinq</th>
                                <th className="py-3 px-4 border-b">Kategoriya</th>
                                <th className="py-3 px-4 border-b">Əməliyyatlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 border-b">
                                    <td className="py-3 px-4">{product.id}</td>
                                    <td className="py-3 px-4">
                                        <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="py-3 px-4 font-medium">{product.title}</td>
                                    <td className="py-3 px-4">${product.price}</td>
                                    <td className="py-3 px-4">{product.stock}</td>
                                    <td className="py-3 px-4">{product.rating}</td>
                                    <td className="py-3 px-4">{product.category}</td>
                                    <td className="py-3 px-4 space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => handleUpdate(product)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Yenilə
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            {selectedProduct ? 'Məhsulu Yenilə' : 'Yeni Məhsul Əlavə Et'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Ad</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {formErrors.title && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                                )}
                            </div>

                         
                            <div>
                                <label htmlFor="title2" className="block text-sm font-medium text-gray-700">İkinci Ad</label>
                                <input
                                    type="text"
                                    id="title2"
                                    name="title2"
                                    value={formData.title2}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {formErrors.title2 && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.title2}</p>
                                )}
                            </div>

                          
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Təsvir</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                                {formErrors.description && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                                )}
                            </div>

                         
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Qiymət</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {formErrors.price && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                                )}
                            </div>

                           
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stok Sayı</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {formErrors.stock && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.stock}</p>
                                )}
                            </div>

                         
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Reytinq (1-5)</label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {formErrors.rating && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.rating}</p>
                                )}
                            </div>

                         
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Şəkil URL</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {formErrors.imageUrl && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.imageUrl}</p>
                                )}
                            </div>

                            
                             <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategoriya</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Kategoriya seçin</option>
                                    <option value="Beverage">İçkilər</option>
                                    <option value="Snack">Qəlyanaltılar</option>
                                    <option value="Dairy">Süd Məhsulları</option>
                                    <option value="Hygiene">Gigiyena Məhsulları</option>
                                    <option value="Candy">Şirniyyat</option>
                                </select>
                                {formErrors.category && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                                )}
                            </div>


                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setFormData({ 
                                            title: '', title2: '', description: '', price: '',
                                            stock: '', rating: '', imageUrl: '', category: '',
                                        });
                                        setFormErrors({}); 
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Ləğv Et
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    {selectedProduct ? 'Yenilə' : 'Əlavə Et'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;