import chef from '/images/chef/sadChef.svg'

export const NoData = () => {
	return <div className="w-full min-h-[250px] h-full flex flex-col items-center justify-center">
		<img src={chef}/>
		<p className='font-bold mt-3'>아직 등록된 상품이 없어요</p>
	</div>
}