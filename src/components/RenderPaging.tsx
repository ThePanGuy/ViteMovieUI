import React from "react";
import {Page} from "../hooks/PagingHook";


interface Props {
    pages: Page[] | undefined,
    currentPage: Page,
    previousPage: any,
    nextPage: any,
    gotoPage: any,
}

const RenderPaging: React.FunctionComponent<Props> = ({
                                                          pages = [],
                                                          currentPage,
                                                          previousPage,
                                                          nextPage,
                                                          gotoPage
                                                      }) => {

    const hideThreshold = 7;

    const showEllipsis = () => {
        return pages.length > hideThreshold && currentPage.index > 2;
    };

    const showPageNumber = (page: Page) => {
        // always hide first and last page, since we render them manually
        if (isFirstPage(page) || isLastPage(page)) {
            return false;
        } else {
            return pages.length <= hideThreshold || (page.index >= currentPage.index - 1 && page.index <= currentPage.index + 1);
        }
    };

    const showEllipsis2 = () => {
        return pages.length > hideThreshold && currentPage.index < pages.length - 3;
    };

    const showLastpage = () => {
        return pages.length > 1
    };
    const isCurrentPage = (page: Page) => {
        return page.index === currentPage.index;
    };
    const isFirstPage = (page: Page) => {
        return page.index === 0;
    };
    const isLastPage = (page: Page) => {
        return page.index === pages.length - 1;
    };
    const goToNextPage = () => {
        nextPage();
    }
    const goToPrevPage = () => {
        previousPage();
    }

    const goToSpecificPage = (page: number) => {
        gotoPage(page);
    }

    if (pages && pages.length > 1) {
        return (
            <div>
                <hr className="is-marginless"/>
                <div className="panel no-m-bottom">
                    <nav className="pagination is-centered" role="navigation" aria-label="pagination">

                        <button className={'pagination-previous button' + (isFirstPage(currentPage) ? ' is-static' : '')}
                           onClick={() => goToPrevPage()}>Previous</button>

                        <button className={'pagination-next button' + (isLastPage(currentPage) ? ' is-static' : '')}
                           onClick={() => goToNextPage()}>Next page</button>

                        <ul className="pagination-list">
                            <li>
                                <button className={'pagination-link ' + (isFirstPage(currentPage) ? ' is-current' : '')}
                                   onClick={() => goToSpecificPage(0)}
                                   aria-label="Goto page 1">1</button>
                            </li>

                            {showEllipsis() && <li><span className="pagination-ellipsis">&hellip;</span></li>}

                            {pages.map((page) => {
                                if (showPageNumber(page))
                                    return (
                                        <li key={'p_' + page.index}>
                                            <button className={'pagination-link' + (isCurrentPage(page) ? ' is-current' : '')}
                                               onClick={() => goToSpecificPage(page.index)}
                                               aria-label={'Page ' + page.label}
                                               aria-current="page">{page.label}</button>
                                        </li>)
                            })}

                            {showEllipsis2() && <li>< span className="pagination-ellipsis">&hellip;</span></li>}

                            {showLastpage() &&
                                <li>
                                    <button className={'pagination-link ' + (isLastPage(currentPage) ? ' is-current' : '')}
                                       onClick={() => goToSpecificPage(pages.length - 1)}
                                       aria-label={'Goto page ' + pages.length}>{pages.length}</button>
                                </li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        )
    } else {
        return (<div/>)
    }
};

export default RenderPaging;
