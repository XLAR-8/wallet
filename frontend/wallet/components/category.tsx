const categoryMap = [
    { "Icon": "🏠", "Name": "All" },
    { "Icon": "📊", "Name": "A/B Testing" },
    { "Icon": "📑", "Name": "Accounting" },
    { "Icon": "📢", "Name": "Advertising" },
    { "Icon": "💰", "Name": "Affiliate Tracking" },
    { "Icon": "📊", "Name": "Analytics" },
    { "Icon": "👼", "Name": "Angel Investing" },
    { "Icon": "⌚", "Name": "Apple Watch" },
    { "Icon": "🤖", "Name": "Artificial Intelligence" },
    { "Icon": "🔊", "Name": "Audio" },
    { "Icon": "📝", "Name": "Blogging" },
    { "Icon": "📚", "Name": "Books" },
    { "Icon": "🤖", "Name": "Bots" },
    { "Icon": "🏷️", "Name": "Branding" },
    { "Icon": "🧩", "Name": "Browser Extensions" },
    { "Icon": "🏗️", "Name": "Building Products" },
    
  ];
  
  export const CategoryComponent = () => {
    return (
      <div>
        <div className="flex flex-row gap-x-7">
      <div data-controller="category-links" 
           data-category-links-active-class="bg-gray-50 text-gray-700" 
           data-category-links-inactive-class="hover:bg-gray-50 focus:bg-gray-50 text-gray-500" 
           className="grid gap-1 p-4 border-r border-gray-300">
        {categoryMap.map((category, index) => (
          <a key={index}
             data-category-links-target="link" 
             data-action="click->category-links#clicked" 
             className="h-8 rounded-lg flex items-center pl-1 pr-3 bg-gray-50 text-gray-700" 
             href="/">
            <div className="shrink-0 w-7 h-7 flex items-center justify-center bg-white border rounded-md mr-2">
              {category.Icon}
            </div>
            <div className="text-sm font-medium line-clamp-1">
              {category.Name}
            </div>
          </a>
        ))}
      </div>

      {/* Uncomment and update the following part as needed */}
      {/* <div className="w-80 shrink-0 hidden md:block">
          <Sidebar />
      </div> */}
    </div>
  
   
      </div>
    );
  }
  