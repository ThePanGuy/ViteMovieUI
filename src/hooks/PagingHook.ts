import {useEffect, useState} from "react";
import {post} from "../utilities/fetch";

export interface Page {
    index: number;
    label: number;
}

export interface PagingRequest {
    page: number,
    size: number,
    filter?: Filter,
    order?: Order
}

export interface PagingResponse<T> {
    content: T[],
    totalElements: number,
    hasNextPage: boolean
}

export interface Filter {
    filterItems: SingleValueFilterItem[]
}

export interface Order {
    property: string,
    isAsc: boolean
}

export interface SingleValueFilterItem {
    value: any,
    name: string
}

export interface PagingHandler<T> {
    filter: any,
    // filters: any,
    removeFilter: any,
    sort: any,
    response: PagingResponse<T> | undefined,
    pages: Page[] | undefined,
    currentPage: Page,
    previousPage: any,
    nextPage: any,
    gotoPage: any,
    hasOrder: any,
    reset: any,
    isLoading: boolean,
    isFetching: boolean,
    hasItems: boolean,
    reload: any;
    execute: any,
    totalItems: number,
    pageRequest: PagingRequest,
    findFilter: any
}

export const usePaging = <T>(url: string, pageSize: number, initialPage: number = -1, initialPagingRequest: PagingRequest | null = null, onPageExceedingLimits?: any): PagingHandler<T> => {

    const defaultRequest = {page: initialPage, size: pageSize};

    const [pages, setPages] = useState<Page[]>()
    const [pageRequest, setPageRequest] = useState<PagingRequest>(!!initialPagingRequest ? initialPagingRequest : defaultRequest);
    const [response, setResponse] = useState<PagingResponse<T>>();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        if (pageRequest.page > -1) loadData();
    }, [pageRequest])

    const reset = (to: number) => {
        const toPage = isNaN(to) ? initialPage : to;

        setPageRequest(
            !!initialPagingRequest
                ? {...initialPagingRequest, page: toPage, filter: undefined} :
                {...defaultRequest, page: toPage})
        setResponse(undefined);
        setPages(undefined);
    }

    const execute = () => {
        const copy: PagingRequest = JSON.parse(JSON.stringify(pageRequest));
        copy.filter = undefined;
        copy.page = 0;
        setPageRequest(copy);
    }

    const reload = () => {
        loadData();
    };

    const loadData = () => {
        if (pageRequest.page > -1) {
            setIsFetching(true);
            post(url, pageRequest)
                .then((response: PagingResponse<T>) => {
                    setResponse(response);
                    setPages(initPages(response.totalElements));
                    if (onPageExceedingLimits) {
                        let prevPage = pageExceeds(response);
                        if (prevPage >= 0) {
                            onPageExceedingLimits(prevPage);
                        }
                    }
                })
                .catch((message) => {
                    console.log(message);
                    // openToast(message, toast.TYPE.ERROR);
                }).finally(() => setIsFetching(false));
        }
    };

    const initPages = (totalItems: number) => {
        let pages = [];
        if (totalItems > pageSize) {
            const numberOfPages = Math.ceil(totalItems / pageSize);
            for (let i = 0; i < numberOfPages; i++) {
                pages.push({index: i, label: i + 1});
            }
        } else {
            pages.push({index: 0, label: 1});
        }
        return pages;
    };

    const pageExceeds = (response: PagingResponse<T>): number => {
        if (response.totalElements > 0) {
            if (response.content === undefined || response.content.length <= 0) {
                let newNumberOfPages = Math.ceil(response.totalElements / pageSize);
                if (newNumberOfPages > 0) {
                    return newNumberOfPages - 1;
                }
            }
        }
        return -1;
    }

    const handlePageChange = (newPageIndex: number) => {
        setPageRequest({...pageRequest, page: newPageIndex});
    };

    const handlePreviousPage = () => {
        if (pageRequest && pageRequest.page > 0)
            handlePageChange(pageRequest.page - 1)
    };

    const handleNextPage = () => {
        if (pageRequest && pages && pageRequest.page < pages.length - 1)
            handlePageChange(pageRequest.page + 1)
    };

    const isLoading = (): boolean => {
        return pageRequest.page > -1 && !response;
    };

    const hasItems = () => {
        return !!response && !!response.content && response.content.length > 0;
    };

    const filter = (filter: SingleValueFilterItem) => {
        const r: PagingRequest = {...pageRequest};
        r.page = 0;
        r.size = pageSize;

        if (!r.filter)
            r.filter = new class implements Filter {
                filterItems: SingleValueFilterItem[] = [];
            }();

        const item: SingleValueFilterItem = findOrCreate(r.filter.filterItems, filter.name);
        item.value = filter.value;
        setPageRequest(r);
    };

    // const filters = (filters: SingleValueFilterItem[]) => {
    //     const r: PagingRequest = {...pageRequest};
    //     if (valuesHaveChanged(filters, r)) {
    //         r.page = 0;
    //         r.size = pageSize;
    //     }
    //     if (!r.filter)
    //         r.filter = new class implements Filter {
    //             filterItems: SingleValueFilterItem[] = [];
    //         }();
    //     filters.forEach(f => {
    //         const item: SingleValueFilterItem = findOrCreate(r.filter!.filterItems, f.name);
    //         item.value = f.value;
    //     });
    //     setPageRequest(r);
    // };
    //
    // const valuesHaveChanged = (filters: SingleValueFilterItem[], r: PagingRequest): boolean => {
    //     if (r.filter?.filterItems) {
    //         let previousFilters = r.filter.filterItems;
    //         for (let i = 0, length = filters.length; i < length; i++) {
    //             let currentFilter = filters[i];
    //             let filterNameFound = false;
    //             for (let j = 0, jLength = previousFilters.length; j < jLength; j++) {
    //                 let prevFilter = previousFilters[j];
    //                 if (prevFilter.name == currentFilter.name) {
    //                     filterNameFound = true;
    //                     if (!(prevFilter.value == currentFilter.value)) {
    //                         return true;
    //                     }
    //                 }
    //             }
    //             if (!filterNameFound) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     } else {
    //         return false;
    //     }
    // }

    const findOrCreate = <FILTER extends SingleValueFilterItem>(arr: FILTER[], name: string): FILTER => {
        const index = arr.findIndex(i => i.name === name);
        if (index > -1) return arr[index];
        else {
            const item = {name: name} as FILTER;
            arr.push(item);
            return item;
        }
    };

    const removeFilter = (name: string) => {
        if (pageRequest.filter && pageRequest.filter.filterItems) {
            const r: PagingRequest = {...pageRequest};
            const idx = r.filter!.filterItems.findIndex(s => s.name === name);
            if (idx > -1) r.filter!.filterItems.splice(idx, 1);
            setPageRequest(r);
        }
    };

    const hasOrder = (property: string): Order | undefined => {
        return pageRequest.order && pageRequest.order.property === property ? pageRequest.order : undefined;
    };

    const sort = (property: string) => {
        const r: PagingRequest = {...pageRequest};
        r.page = 0;
        r.size = pageSize;

        if (!r.order || r.order.property !== property) {
            r.order = new class implements Order {
                isAsc: boolean = true;
                property: string = property;
            }()
        } else if (r.order.property === property) {
            r.order.isAsc = !r.order.isAsc;
        }

        setPageRequest(r);
    };

    const findFilter = (name: string) => {
        if (pageRequest.filter && pageRequest.filter.filterItems) {
            return pageRequest.filter!.filterItems.find(f => f.name === name);
        }
        return null;
    };

    return {
        pages: pages,
        currentPage: pageRequest ? {index: pageRequest.page, label: pageRequest.page + 1} : {index: 0, label: 1},
        response: response,
        previousPage: handlePreviousPage,
        nextPage: handleNextPage,
        gotoPage: handlePageChange,
        filter: filter,
        // filters: filters,
        removeFilter: removeFilter,
        reset: reset,
        hasOrder: hasOrder,
        sort: sort,
        isLoading: isLoading(),
        isFetching: isFetching,
        hasItems: hasItems(),
        reload: reload,
        execute: execute,
        totalItems: !!response ? response.totalElements : 0,
        pageRequest: pageRequest,
        findFilter: (name: string) => findFilter(name)
    };

}