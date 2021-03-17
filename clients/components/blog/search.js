import renderHtml from 'react-render-html'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { searchBLog } from '../../actions/blog'
const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        message: '',
        results: [],
        searched: false
    })
    const handleChange = (e) => {
        setValues({ ...values, search: e.target.value, searched: false, results: [] })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        searchBLog({ search }).then(data => {
            console.log(data)
            if (data.error) {

            } else {
                setValues({ ...values, results: data, searched: true, message: `${data.length} blogs Found` })
            }
        })
    }

    const searchedBLog = (results = []) => {
        return (
            <div className="jumbotron bg-white">
                {message && <p className="pt-4 text-muted font-italic">{message}</p>}
                {results.map((b, i) => (
                    <div key={i} className="">
                        <Link href={`/blogs/${b.slug}`}>
                            <a className="text-primary">{b.title}</a>
                        </Link>

                    </div>
                ))}
            </div>
        )
    }

    const { message, search, results, searched } = values
    const SearchForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-8">
                    <input type="search"
                        placeholder="Search blog..."
                        onChange={handleChange}
                        className="form-control" />
                </div>
                <div className="col-md-4">
                    <button
                        className="btn btn-block btn-outline-primary"
                        type="submit">Search</button>

                </div>
            </div>
        </form>
    )
    return (
        <div className="container-fluid">

            <div className="pt-3 pb-5">
                {SearchForm()}
                {searched && <div style={{ marginBottom: '-80px' }}>{searchedBLog(results)}</div>}
            </div>
        </div>
    )
}
export default Search