const Footer = () => {
	return (
		<footer>
			<div className='flex justify-center items-center dark:bg-gray-900 p-4 shadow-md'>
				<p className='text-center text-gray-500'>
					&copy; {new Date().getFullYear()} Pokedex
				</p>
			</div>
		</footer>
	);
};

export default Footer;
