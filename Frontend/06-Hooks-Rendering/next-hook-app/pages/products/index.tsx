import { Category, Product } from "@/interface/product";
import { useEffect, useState } from "react";

const ProductList = () => {
  const originalCategoryList: Category[] = [
    { category_id: 1, category: "노트북", sort: 1 },
    { category_id: 2, category: "냉장고", sort: 2 },
    { category_id: 3, category: "티비", sort: 3 },
  ];

  const originalProductList: Product[] = [
    {
      product_id: 1,
      category_id: 1,
      product_name: "삼성 노트북 2024 갤럭시북 4",
      manufacturer: "삼성전자",
      price: 939000,
      stock: 2,
      image: "",
    },
    {
      product_id: 2,
      category_id: 1,
      product_name: "LG 노트북 그램",
      manufacturer: "LG전자",
      price: 1539000,
      stock: 1,
      image: "",
    },
    {
      product_id: 3,
      category_id: 3,
      product_name: "LG 75인치 UHD TV",
      manufacturer: "LG전자",
      price: 2990000,
      stock: 3,
      image: "",
    },
    {
      product_id: 4,
      category_id: 2,
      product_name: "삼성 내장고 2023",
      manufacturer: "삼성전자",
      price: 5090000,
      stock: 1,
      image: "",
    },
    {
      product_id: 5,
      category_id: 2,
      product_name: "삼성 냉장고 2024",
      manufacturer: "삼성전자",
      price: 6090000,
      stock: 2,
      image: "",
    },
  ];

  //콤보박스에 바인딩될 카테고리 목록
  const [categories, setCategories] = useState<Category[]>([]);

  //콤보박스에서 선택된 단일 분류정보
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  //제품 테이블에 바인딩될 제품 목록
  const [products, setProducts] = useState<Product[]>([]);

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const category = categories.find((item) => item.category_id === event.target.value);
    setSelectedCategory(category as Category);
  }

  useEffect(() => {
    setCategories(originalCategoryList);
    setProducts(originalProductList);
    setSelectedCategory({category: "", category_id: 0, sort: 0});
  }, []);

  useEffect(() => {
    let selectedResult = originalProductList.filter((item) => item.category_id == selectedCategory.category_id);;

    if(selectedCategory && selectedCategory.category_id == 0) {
        setProducts(originalProductList);

    } 
    if (selectedCategory && selectedCategory.category_id > 0) {
        setProducts(selectedResult);
    }
  }, [selectedCategory]);

  return (
    <div className="m-8">
      <div className="my-4">
        <select
          id="country"
          name="country"
          autoComplete="country-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          onChange={handleChange}
        >
            <option value="0">전체보기</option>
            {categories.map((item, index) => (
                <option key={index} value={item.category_id}>{item.category}</option>  
            ))}
        </select>
      </div>
      <h1>Product List</h1>
      <table className="w-full text-left">
        <thead>
            <tr>
                <th>제품번호</th>
                <th>제품명</th>
                <th>제조사</th>
                <th>가격</th>
            </tr>
        </thead>
        <tbody>
            {products.map((item, index) => (
                <tr className="first:border-t-2 border-collapse border-slate-200 border-t-[1px] text-neutral-400 my-8" key={index}>
                    <td>{item.product_id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.price}</td>
                </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
};

export default ProductList;
