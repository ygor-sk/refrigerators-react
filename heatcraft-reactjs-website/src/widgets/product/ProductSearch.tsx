import * as React from "react";

export default function ProductSearch() {
    return <section className="primary-search">
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-6">
                    <h3 className="primary-search__title">What are you looking for?</h3>
                    <form className="primary-search__box">
                        <input
                            className="input"
                            name="search"
                            placeholder="Products, Parts, Materials"
                        />
                        <button className="button button-primary button__with-icon">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
}
