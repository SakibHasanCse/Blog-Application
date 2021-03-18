
import Link from 'next/link';
import { API } from '../config'

import moment from 'moment'
import renderHTML from 'react-render-html';
const BLogCart = ({ blog }) => {
    const ShowCategory = (blog) => {
        return blog.categories.map((category, i) => (
            <Link href={`/category/${category.slug}`}>
                <a className="btn btn-primary ml-1 mr-1 mt-3"> {category.name}</a>
            </Link>

        ))
    }
    const ShowTags = (blog) => {
        return blog.tags.map((tag, i) => (
            <Link href={`/tags/${tag.slug}`}>
                <a className="btn btn-outline-primary ml-1 mr-1 mt-3"> {tag.name}</a>
            </Link>

        ))
    }
    return (
        <div className="lead">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a><h2 className=" font-weight-bold">{blog.title}</h2></a>
                </Link>
            </header>
            <section>
                <p className="mark ml-1 pt-2 pb-2">
                    Written by <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.name}</a>

                    </Link> | Publish {moment(blog.createdAt, "YYYYMMDD").fromNow()}
                </p>

            </section>
            <section>
                {ShowCategory(blog)}
                {ShowTags(blog)}
                <br /><br />

            </section>
            <div className="row">
                <div className="col-md-4">
                    <section>
                        <img alt={blog.title} style={{ objectFit: 'cover', maxHeight: "300px", height: 'auto', width: '100%' }} className="img img-fluid" src={`${API}/blog/photo/${blog.slug}`} />
                    </section>

                </div>
                <div className="col-md-8">
                    <section>
                        <div className="pb-3">

                            {renderHTML(blog.excerpt)}
                        </div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="btn btn-primary pt-2">Read More</a>

                        </Link>

                    </section>


                </div>

            </div>

        </div>
    )

}
export default BLogCart