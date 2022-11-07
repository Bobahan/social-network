import React from "react";
import style from './Users.module.css';
import userImg from '../../assets/userImg.png';
import { NavLink } from "react-router-dom";

const Users = (props) => {
    let totalPages = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const onChangePage = (pageNumber) => {
        props.changeCurrentPage(pageNumber)
    }

    const follow = (userID) => {
        props.follow(userID)
    }

    const unfollow = (userID) => {
        props.unfollow(userID)
    }

    return (
        <div>
            <div>
                {
                    pages.map((p, id) => {
                        return <span style={{ 'cursor': 'pointer' }} key={id} className={props.currentPage === p ? style.selectedPage : ''} onClick={() => { onChangePage(p) }}>{p}</span>
                    })
                }
            </div>
            {
                props.users.map((u, id) =>
                    <div key={id}>
                        {u.name}
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img alt="userImg" style={{ 'width': '100px' }} src={u.photos.small ? u.photos.small : userImg} />
                            </NavLink>
                        </div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { unfollow(u.id) }}>UNFOLLOW</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { follow(u.id) }}>FOLLOW</button>}
                    </div>
                )
            }
        </div>
    )
}

export default Users