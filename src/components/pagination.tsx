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
			<PaginationContent>
				<PaginationItem>
					<PaginationFirst
						onClick={first}
						href={`#search=${active}`}
					>
						&lt;&lt;
					</PaginationFirst>
				</PaginationItem>
				<PaginationItem>
					<PaginationPrevious
						href={`#search=${active}`}
						onClick={previous}
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
								href={`#search=${page}`}
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
						href={`#search=${active}`}
						onClick={next}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationLast
						href={`#search=${active}`}
						onClick={last}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationComponent;