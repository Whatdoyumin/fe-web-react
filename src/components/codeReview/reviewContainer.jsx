import React, { useState, useEffect, useRef } from 'react';
import { FaCircleArrowUp, FaTrash } from 'react-icons/fa6';
import { client } from '../../utils';
import { getUserId } from '../../auth';
import { useParams } from 'react-router-dom';
import DataLoadingSpinner from '../common/dataLoadingSpinner';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

export default function ReviewContainer({
  selectedStart,
  selectedEnd,
  onResetSelection,
  onHighlightLine,
  setHighlightedLines,
}) {
  const { submitId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const textareaRef = useRef(null);
  const currentUserId = parseInt(getUserId());

  useEffect(() => {
    const fetchReviewData = async () => {
      setIsLoading(true);
      try {
        const response = await client.get(`/api/v1/crew/activity/problem/submission/${submitId}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setReviews(response.data.comments);
        } else {
          console.error('댓글 데이터를 불러오지 못했어요.', response.statusText);
        }
      } catch (error) {
        console.error('댓글 데이터를 불러오는 중 문제가 발생했어요.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewData();
  }, [submitId]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [review]);

  const saveReview = async () => {
    const newReview = {
      line_number_start: selectedStart,
      line_number_end: selectedEnd,
      content: review,
    };

    try {
      const response = await client.post(
        `/api/v1/crew/activity/problem/submission/${submitId}/comment`,
        newReview,
        submitId,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setReviews([...reviews, response.data]);
        setReview('');
        onResetSelection();
        setSelectedReviewIndex(null);
        setHighlightedLines({ start: null, end: null });
        alert('댓글이 등록되었어요!');
        window.location.reload();
      } else {
        console.error('댓글을 저장하는 중 문제가 발생했어요.', response.statusText);
      }
    } catch (error) {
      console.error('댓글을 저장하는 중 문제가 발생했어요.', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveReview();
    }
  };

  const handleReviewClick = (index, start, end) => {
    if (selectedReviewIndex === index) {
      setSelectedReviewIndex(null);
      onHighlightLine(null, null);
      setHighlightedLines({ start: null, end: null });
    } else {
      setSelectedReviewIndex(index);
      onHighlightLine(start, end);
      setHighlightedLines({ start, end });
    }
  };

  const handleDelete = async (commentId, index) => {
    const comment = reviews[index];
    console.log('Current User ID:', currentUserId);
    console.log('Comment Created By User ID:', comment.created_by.user_id);
    console.log('삭제 클릭:', commentId, comment);

    if (!comment) {
      console.error('댓글을 찾을 수 없습니다.');
      return;
    }

    if (currentUserId === comment.created_by.user_id) {
      try {
        const response = await client.delete(
          `/api/v1/crew/activity/problem/submission/comment/${commentId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 204) {
          const updatedReviews = reviews.filter((_, i) => i !== index);
          setReviews(updatedReviews);
          setSelectedReviewIndex(null);
          onHighlightLine(null, null);
          setHighlightedLines({ start: null, end: null });
          alert('댓글이 삭제되었어요!');
          window.location.reload();
        } else {
          console.error('댓글을 삭제하는 중 문제가 발생했어요.', response.statusText);
        }
      } catch (error) {
        console.error('댓글을 삭제하는 중 문제가 발생했어요.', error);
      }
    } else {
      alert('본인이 작성한 댓글만 삭제할 수 있어요.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-20">
        <div className="m-10 flex flex-col items-center justify-center">
          <DataLoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {reviews.length > 0 && (
        <div className="flex flex-col gap-6">
          {reviews
            .sort(
              (a, b) =>
                a.line_number_start - b.line_number_start ||
                new Date(a.created_at) - new Date(b.created_at)
            )
            .map((item, index) => (
              <div
                key={index}
                className={`box w-full min-w-60 p-5 hover:bg-gray-50 ${
                  selectedReviewIndex === index
                    ? 'border-color-blue-w50 bg-gray-100'
                    : 'border-gray-200 bg-white'
                }`}
                onClick={() =>
                  handleReviewClick(index, item.line_number_start, item.line_number_end)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex w-full flex-col justify-between">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        {`라인 ${item.line_number_start} ~ ${item.line_number_end}`}
                      </span>
                      <div className="flex">
                        <FaTrash
                          className="h-3.5 w-3.5 cursor-pointer text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.comment_id, index);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-2 flex items-center">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}${item.created_by.profile_image}`}
                        alt="profile_image"
                        className="mr-2 h-6 w-6 rounded-full object-cover"
                      />
                      <div className="inline-flex items-center justify-start gap-2">
                        <span className="text-sm font-semibold text-gray-600">
                          {item.created_by.username}
                        </span>
                        <span className="text-sm text-gray-600">|</span>
                        <span className="text-sm text-gray-400">{formatDate(item.created_at)}</span>
                      </div>
                    </div>
                    <p className="h-fit w-full whitespace-pre-wrap break-words text-sm font-medium text-gray-800">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {selectedStart !== null && selectedEnd !== null && (
        <div className="box mt-6 flex w-full flex-row items-center justify-between p-4">
          <textarea
            ref={textareaRef}
            type="text"
            className="longSentence h-fit w-11/12 min-w-60 resize-none"
            placeholder="선택한 부분에 대한 리뷰를 작성해주세요"
            value={review}
            onChange={handleReviewChange}
            onKeyDown={handleKeyDown}
            style={{ overflow: 'hidden' }}
          />
          <FaCircleArrowUp
            className={`h-6 w-6 cursor-pointer ${review.trim() !== '' ? 'text-color-blue-main' : 'pointer-events-none cursor-default text-gray-200'}`}
            onClick={saveReview}
            aria-label="SaveReview"
            disabled={review.trim() === ''}
          />
        </div>
      )}
    </div>
  );
}
