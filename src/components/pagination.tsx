import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationComponent = ({
	first,
	previous,
	next,
	last,
	range,
	active,
	setPage,
}: {
	first: () => void;
	previous: () => void;
	next: () => void;
	last: () => void;
	range: Array<number | 'dots'>;
	active: number;
	setPage: (page: number) => void;
}) => {
	return (
		<Pagination>
			<PaginationContent className='flex justify-center items-center gap-4 flex-wrap'>
				<PaginationItem>
					<PaginationFirst
						onClick={first}
						className={`${
							active === 1
								? 'cursor-not-allowed hover:bg-gray-300 text-gray-400'
								: ''
						}`}
					>
						&lt;&lt;
					</PaginationFirst>
				</PaginationItem>
				<PaginationItem>
					<PaginationPrevious
						onClick={previous}
						className={`${
							active === 1
								? 'cursor-not-allowed hover:bg-gray-300 text-gray-400'
								: ''
						}`}
					/>
				</PaginationItem>
				{range.map((page: number | 'dots', index: number) =>
					page === 'dots' ? (
						<PaginationItem key={index}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={index}>
							<PaginationLink
								onClick={() => setPage(page)}
								isActive={active === page}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					)
				)}
						<PaginationItem>
							<PaginationNext
								onClick={next}
								className={`${
									active === Number(range[range.length - 1])
										? 'cursor-not-allowed hover:bg-gray-300 text-gray-400'
										: ''
								}`}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLast
								onClick={last}
								className={`${
									active === Number(range[range.length - 1])
										? 'cursor-not-allowed hover:bg-gray-300 text-gray-400'
										: ''
								}`}
							/>
						</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationComponent;
