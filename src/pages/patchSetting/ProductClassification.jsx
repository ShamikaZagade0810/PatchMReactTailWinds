import React, { useState, useEffect } from 'react';
import {
    Boxes,
    Layers3,
    RefreshCcw,
    Clock3,
    Search,
    X,
    RotateCcw,
    Save,
    ShieldCheck,
    Wrench,
    Package,
    MonitorSmartphone,
    HardDrive,
    Cpu,
    Sparkles,
    BadgeAlert,
    CircleDot,
    Compass,
    RefreshCw,
} from 'lucide-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getProductsListing, getClassificationsListing, updateProductClass, DiscoverProducts, DiscoverClasification,
    getselectedProductsList, getselectedClassificationsList } from "../../api/projectApi";

const ProductClassification = () => {

    // DYNAMIC STATES
    const [productList, setProductList] = useState([]);
    const [classificationList, setClassificationList] = useState([]);
    const [syncStatus, setSyncStatus] = useState({ value: 'Pending', subtitle: 'Awaiting update', color: 'text-yellow-400' });

const getClassificationIcon = (classificationName = '') => {
    const name = classificationName.toLowerCase();
    if (name.includes('application')) return MonitorSmartphone;
    if ( name.includes('critical') || name.includes('alert') )  return BadgeAlert;
    if ( name.includes('security') || name.includes('definition') ) return ShieldCheck;
    if ( name.includes('driver') )  return HardDrive;
    if ( name.includes('feature') ) return Sparkles;
    if ( name.includes('service') ) return Package;
    if ( name.includes('tool') ) return Wrench;
    if ( name.includes('rollup') ) return Layers3;
    if ( name.includes('update') ) return RefreshCcw;
    if ( name.includes('upgrade') ) return CircleDot;
    // DEFAULT ICON
    return Layers3;
};

const [search, setSearch] = useState('');

// ======================== Selected Products & Classifcation ======================== //
const [selectedProducts, setSelectedProducts] = useState([]);

const [enabledClassifications, setEnabledClassifications] = useState([]);

const fetchSelectedProducts = async () => {
    try {
        const response = await getselectedProductsList();

        if (response?.data?.status === 200) {

            const selectedData =
                response.data.data.map((item) => item.value);

            setSelectedProducts(selectedData);
        }

    } catch (error) {
        console.log("Error fetching selected products:", error);
        toast.error("Failed to fetch selected products");
    }
};

const fetchSelectedClassifications = async () => {
    try {

        const response = await getselectedClassificationsList();

        if (response?.data?.status === 200) {

            const selectedData =
                response.data.data.map((item) => item.value);

            setEnabledClassifications(selectedData);
        }

    } catch (error) {
        console.log("Error fetching selected classifications:", error);
        toast.error("Failed to fetch selected classifications");
    }
};

    

// ======================== Fetch All Products & Classifcation List ======================== //
     // FETCH PRODUCTS
    const fetchProducts = async () => {
        try {
            const response = await getProductsListing();

            if (response?.data?.status === 200) {
                setProductList(response.data.data || []);
            }
        } catch (error) {
            console.log("Error fetching products:", error);
            toast.error("Failed to fetch products");
        }
    };

    // FETCH CLASSIFICATIONS
    const fetchClassifications = async () => {
        try {
            const response = await getClassificationsListing();

            if (response?.data?.status === 200) {
                setClassificationList(response.data.data || []);
            }
        } catch (error) {
            console.log("Error fetching classifications:", error);
            toast.error("Failed to fetch classifications");
        }
    };

    // INITIAL LOAD
    useEffect(() => {
        fetchProducts();
        fetchClassifications();
        fetchSelectedProducts();
    fetchSelectedClassifications();
    }, []);


    const toggleProduct = (product) => {
        setSelectedProducts((prev) =>
            prev.includes(product)
                ? prev.filter((p) => p !== product)
                : [...prev, product]
        );
    };

    const toggleClassification = (item) => {
        setEnabledClassifications((prev) =>
            prev.includes(item)
                ? prev.filter((p) => p !== item)
                : [...prev, item]
        );
    };

    const filteredProducts = productList.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleReset = () => {
    setSelectedProducts([]);
    setEnabledClassifications([]);
    setSearch('');
};

const handleUpdate = async () => {

    try {          // LOADING STATUS
        setSyncStatus({  value: 'Updating', subtitle: 'Saving changes...', color: 'text-blue-400' });

        const inputData = {
            productNames: selectedProducts,
            classificationNames: enabledClassifications
        };
        const response = await updateProductClass(inputData);

        if (response?.data?.status === 200) {
            toast.success(  response?.data?.message || "Updated successfully" );
             // SUCCESS STATUS
            setSyncStatus({ value: 'Updated', subtitle: 'Configuration synced', color: 'text-emerald-400' });
        } else if (response?.data?.status === 409) {
            toast.warning(  response?.data?.message || "Check again" );            
        } 
        
        else { toast.error("Failed to update"); 
            // FAILED STATUS
            setSyncStatus({ value: 'Failed', subtitle: 'Update failed', color: 'text-red-400' });
        }

    } catch (error) {
        console.log("Update error:", error);
        toast.error( error?.response?.data?.message || "Something went wrong" );
        // FAILED STATUS
            setSyncStatus({ value: 'Failed', subtitle: 'Update failed', color: 'text-red-400' });
    }
};

const handleDiscoverProducts = async () => {
    try {
        setSyncStatus({ value: "Discovering", subtitle: "Fetching latest products...",  color: "text-blue-400", });
        const response = await DiscoverProducts();
        if (response?.data?.status === 200) {
            toast.success( response?.data?.message || "Products discovered successfully" );
            // Reload product list
            await fetchProducts();
            setSyncStatus({ value: "Updated", subtitle: "Products discovered", color: "text-emerald-400", });
        } else {
            toast.warning( response?.data?.message || "Unable to discover products" );

            setSyncStatus({ value: "Failed",  subtitle: "Discovery failed",  color: "text-red-400", });
        }
    } catch (error) {
        console.error(error);
        toast.error( error?.response?.data?.message || "Failed to discover products" );
        setSyncStatus({ value: "Failed", subtitle: "Discovery failed",  color: "text-red-400", });
    }
};


const handleDiscoverClassification = async () => {
    try {
        setSyncStatus({ value: "Discovering", subtitle: "Fetching latest classification...",  color: "text-blue-400", });
        const response = await DiscoverClasification();
        if (response?.data?.status === 200) {
            toast.success( response?.data?.message || "Classifications discovered successfully" );
            // Reload product list
            await fetchClassifications();
            setSyncStatus({ value: "Updated", subtitle: "Classifications discovered", color: "text-emerald-400", });
        } else {
            toast.warning( response?.data?.message || "Unable to discover classifications" );

            setSyncStatus({ value: "Failed",  subtitle: "Discovery failed",  color: "text-red-400", });
        }
    } catch (error) {
        console.error(error);
        toast.error( error?.response?.data?.message || "Failed to discover classifications" );
        setSyncStatus({ value: "Failed", subtitle: "Discovery failed",  color: "text-red-400", });
    }
};

// MAIN CONTENT
    return (
        <div className="min-h-screen  text-white p-2 ">
            <ToastContainer />
            {/* Main Wrapper */}
            <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10">
                {/* Header */}
               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-white/10">
                    <div>   
                        <h1 className="text-xl font-semibold"> Product & Classification </h1>
                        <p className="text-sm text-gray-400 mt-1"> Curate the products and update categories to sync from Microsoft Update. </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={handleReset} className="h-10 px-4 rounded-lg border border-white/10 bg-[#111C2F] hover:bg-[#16243a] transition flex items-center gap-2 text-sm">
                            <RotateCcw size={16} /> Reset
                        </button>

                        <button onClick={handleUpdate} className="h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium shadow-md shadow-blue-500/20">
                            <Save size={16} /> Update
                        </button>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 pt-0 mt-4">
                    {[
                        { title: 'Products selected', value: selectedProducts.length, total: productList.length, icon: Boxes, color: 'text-cyan-400',  },
                        { title: 'Classifications', value: enabledClassifications.length, total: classificationList.length, icon: Layers3, color: 'text-emerald-400', },
                        { title: 'Sync status', value: syncStatus.value,  subtitle: syncStatus.subtitle, icon: RefreshCcw, color:  syncStatus.color, }                        
                    ].map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div key={idx} className="bg-[#0E1728] rounded-xl px-4 py-3 border border-white/10 min-h-[78px]" >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400"> {card.title} </p>
                                        <h3 className="text-xl font-semibold mt-3"> {card.value} </h3>
                                        {card.total && (
                                            <p className="text-xs text-gray-500 mt-1"> of {card.total} </p>
                                        )}
                                        {card.subtitle && (
                                            <p className="text-xs text-gray-500 mt-1">  {card.subtitle} </p>
                                        )}
                                    </div>

                                    <div className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${card.color}`} >
                                        <Icon size={18} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4 p-4 pt-0">
                    {/* Products */}
                    <div className="bg-[#0E1728] rounded-xl border border-white/10 overflow-hidden flex flex-col h-[720px]">
                        {/* Header */}
                        <div className="border-b border-white/10 p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <Boxes size={18} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-semibold"> Products </h2>

                                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] border border-cyan-500/20">
                                            {selectedProducts.length} active
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1"> Tap a product to add it. Click the × on  a chip to remove. </p>
                                </div>
                                 {/* Right Section */}
        <button type="button"  onClick={handleDiscoverProducts}
        className="ml-auto flex items-center gap-2 px-2 py-2 rounded-xl  hover:bg-cyan-500/30 text-white text-sm font-medium transition-colors" >
             <RefreshCw size={16} />
        </button>
                            </div>
                        </div>

                        {/* Selected */}
                        <div className="p-4 border-b border-white/10">
                            <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-3"> Active Selection </p>

                            <div className="flex flex-wrap gap-2">
                                {selectedProducts.map((item) => (
                                    <div key={item} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-blue-500/10 border border-blue-500/30 text-sm text-blue-300" >
                                        <span>{item}</span>
                                        <button onClick={() => toggleProduct(item) } className="hover:text-red-400" >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative mt-5">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                <input type="text" placeholder="Search catalog..." value={search} onChange={(e) => setSearch(e.target.value) }
                                    className="w-full h-9 rounded-xl border border-white/10 bg-[#111827] pl-11 pr-4 text-xs outline-none focus:border-cyan-500/50" />
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="p-4 overflow-y-auto hide-scrollbar flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[11px] uppercase tracking-wide text-gray-500"> Catalog </p>
                                <p className="text-[11px] text-cyan-400"> {filteredProducts.length} available </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {filteredProducts.map((item) => {
                                    const active = selectedProducts.includes(item.value);
                                    return (
                                        <button key={item.value} onClick={() => toggleProduct(item.value) }
                                            className={`px-2.5 py-1.5 rounded-full border text-xs transition-all duration-200
                                                ${ active
                                                        ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                                                        : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-blue-500/40 hover:text-blue-300'
                                                }
                                            `} >
                                            + {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="bg-[#0E1728] rounded-xl border border-white/10 overflow-hidden">
                        {/* Header */}
                        <div className="border-b border-white/10 p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Layers3 size={18} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-semibold"> Classifications </h2>

                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                                            { enabledClassifications.length
                                            }{' '} on
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-400 mt-1"> Toggle update categories on or off. </p>
                                </div>
                                <button type="button" onClick={handleDiscoverClassification} 
                                className="ml-auto flex items-center gap-2 px-2 py-2 rounded-xl  hover:bg-green-500/20 text-white text-sm font-medium transition-colors" >
             <RefreshCw size={16} />
        </button>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {classificationList.map((item) => {
                                const enabled =
                                    enabledClassifications.includes( item.value );

                                // const Icon = classificationIcons[item.value] || Layers3;
                                const Icon = getClassificationIcon(item.value);

                                return (
                                    <div
                                        key={item.value}
                                        className={`rounded-xl border p-4 transition-all
                                            ${ enabled ? 'border-blue-500/40 bg-blue-500/10' : 'border-white/10 bg-white/[0.02]' }  `} >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center
                                                        ${
                                                            enabled
                                                                ? 'bg-blue-500/10 text-blue-400'
                                                                : 'bg-white/5 text-gray-400'
                                                        }
                                                    `}
                                                >
                                                    <Icon size={18} />
                                                </div>

                                                <div>
                                                    <h3 className="text-[13px] font-medium"> {item.label} </h3>
                                                    <p className="text-[11px] text-gray-500 mt-1"> Microsoft update category </p>
                                                </div>
                                            </div>

                                            {/* Toggle */}
                                            {/* <button
                                                onClick={() =>
                                                    toggleClassification(
                                                        item.value
                                                    )
                                                }
                                                className={`w-11 h-6 rounded-full transition relative
                                                    ${
                                                        enabled
                                                            ? 'bg-cyan-500'
                                                            : 'bg-[#1B2638]'
                                                    }
                                                `}
                                            >
                                                <div
                                                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all
                                                        ${
                                                            enabled
                                                                ? 'right-1'
                                                                : 'left-1'
                                                        }
                                                    `}
                                                />
                                            </button> */}
                                            <label className="relative flex items-center cursor-pointer mt-1">
    <input
        type="checkbox"
        checked={enabled}
        onChange={() => toggleClassification(item.value)}
        className="peer hidden"
    />

    <div className="w-5 h-5 rounded-md border border-white/20 bg-[#111827] flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all">
        {enabled && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        )}
    </div>
</label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductClassification
