
import Link from 'next/link';
import { API } from '../config'

import moment from 'moment'
import renderHTML from 'react-render-html';
const SmallCard = ({ blog }) => {


    return (


        <div className="card">
            <img alt={blog.title} className="card-img-top" style={{ height: '250px', width: '100%' }} src={`${API}/blog/photo/${blog.slug}`} />
            <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>

                <p className="mark ml-1 pt-2 pb-2">
                    Written by <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.name}</a>

                    </Link> | Publish {moment(blog.createdAt, "YYYYMMDD").fromNow()}
                </p>
                <a href={`/blogs/${blog.slug}`} className="btn btn-primary">Read More</a>
            </div>
        </div>


    )

}
export default SmallCard