import React from 'react'
import styled from 'styled-components'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { deleteReview } from '../utilities/apis'

const CardContainer = styled.div`
    background-color: white;
    border-radius: 6px;
    padding: 14px;
    margin: 20px 0;
    box-shadow: 0px 4px 12px 1px rgba(0,0,0,0.10);
    display: flex;
    flex-direction: column;
    font-size: 18px;

    > div {
        margin: 2px 0;
        width: 100%;

        &:first-child {
            display: flex;
            justify-content: space-between;
            
            > div {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 80%;
            }
        }

        &:last-child {
            color: hsl(0, 0%, 50%);
            align-self: flex-end;
        }
    }
`

const ReviewCard = (props) => {
    const { review } = props

    const handleDelete = () => {
        deleteReview(review.id)
        window.location.reload()
    }

    return (
        <CardContainer>
            <div>
                <div>ชื่อวิชา: {review.class_name}</div>
                <button onClick={handleDelete}><DeleteOutlineRoundedIcon /></button>
            </div>
            <div>{review.reviews}</div>
            <div>โดย: {review.author}</div>
        </CardContainer>
    )
}

export default ReviewCard
