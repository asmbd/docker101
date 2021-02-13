import React, { useState, useEffect } from 'react'
import { Button, TextField } from "@material-ui/core"
import styled from 'styled-components'
import { getReviews, createReview } from './utilities/apis';
import ReviewCard from './components/ReviewCard';

const Background = styled.div`
	background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
	height: 100vh;
	display: flex;
`

const PageContainer = styled.div`
	display: ${(props) => props.currentPage ? "block" : "none"};
	background-color: white;
	margin: 30px;
	height: calc(100% - 60px - 56px);
	border-radius: 10px;
	width: 100%;
	padding: 28px;
`

const PageTitle = styled.div`
	font-size: 24px;
	font-weight: 600;
`

const CreateButton = styled(Button)`
	&.MuiButton-contained {
		font-size: 20px;
		padding: 2px 10px;
		border-radius: 6px;
		color: white;
		background: #4481eb;
		font-family: 'Kanit';
		box-shadow: none;
		max-width: 300px;
	}
`

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const TextFieldCustom = styled(TextField)`
    &.MuiFormControl-root {
        margin-bottom: 2.6rem;
		width: 100%;
		max-width: 400px;
		align-self: center;

        .MuiFormLabel-root {
            font-size: 32px;
            font-weight: 600;
			font-family: 'Kanit';

    
            &.Mui-focused {
                color: #4481eb
            }
        }

        .MuiInputBase-root {
            .MuiInputBase-input {
                font-size: 18px;
                margin-top: 14px;
				font-family: 'Kanit';
            }

            &.MuiInput-underline:after {
                border-bottom: 2px solid #4481eb;
            }

        }

        .MuiFormHelperText-root {
            font-size: 1.4rem;
        }
    }
`

const ReviewForm = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;

	${CreateButton} {
		align-self: center;
		width: 100%;
		max-width: 220px;
	}
`

function App() {
	const [reviews, setReviews] = useState([])
	const [page, setPage] = useState("main")
	const [newReview, setNewReview] = useState({
		class_name: "",
		reviews: "",
		author: ""
	})

	const inputLabelProps = {
        shrink: true,
    }

	const createNewReview = () => {
		createReview(newReview)
		setPage("main")
		window.location.reload()
	}

	useEffect(() => {
		getReviews((allReview) => setReviews(allReview))
	}, [])

	return (
		<Background>
			<PageContainer currentPage={page === "main"}>
				<TitleContainer>
					<PageTitle>รีวิวทั้งหมด</PageTitle>
					<CreateButton variant="contained" onClick={() => setPage("create")}>สร้างรีวิว</CreateButton>
				</TitleContainer>
				{
					reviews.map((review) => {
						return (
							<ReviewCard review={review} />
						)
					})
				}
			</PageContainer>
			<PageContainer currentPage={page === "create"}>
				<TitleContainer>
					<PageTitle>สร้างรีวิว</PageTitle>
					<CreateButton variant="contained" onClick={() => setPage("main")}>ย้อนกลับ</CreateButton>
				</TitleContainer>
				<ReviewForm>
					<TextFieldCustom
						id="input-class-name" 
						label="ชื่อวิชา" 
						placeholder="ชื่อวิชาที่ต้องการรีวิว" 
						InputLabelProps={inputLabelProps} 
						value={newReview.class_name}
						onChange={(e) => setNewReview({...newReview, class_name: e.target.value})}
					/>
					<TextFieldCustom
						id="input-reviews" 
						label="รีวิว" 
						placeholder="รีวิววิชานี้" 
						multiline
						rows={14}
						InputLabelProps={inputLabelProps} 
						value={newReview.reviews}
						onChange={(e) => setNewReview({...newReview, reviews: e.target.value})}
					/>
					<TextFieldCustom
						id="input-author" 
						label="ผู้เขียน" 
						placeholder="ชื่อหรือนามปากกาผู้เขียน" 
						InputLabelProps={inputLabelProps} 
						value={newReview.author}
						onChange={(e) => setNewReview({...newReview, author: e.target.value})}
					/>
					<CreateButton variant="contained" onClick={createNewReview}>สร้างรีวิวใหม่</CreateButton>
				</ReviewForm>
			</PageContainer>
		</Background>
	);
}

export default App;
