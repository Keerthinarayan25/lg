export default  function ProductsPage({ params }: { params: { slug: string } }){
  const {slug} =  params;
  
  return(
    <div className="p-6 text-xl font-semibold">This is {slug} page</div>
  );
}