import Notice from './notice';
import LeftDashboard from './leftSide/leftDashboard';
import RightDashboard from './rightSide/rightDashboard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../../utils';
import DataLoadingSpinner from '../common/dataLoadingSpinner';

export default function CrewDashContainer() {
  const [crew, setCrew] = useState(null);
  const [statistics, setStatistics] = useState(null); // 추가: statistics 데이터 상태
  const { id } = useParams();

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await client.get(`/crew/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setCrew(response.data);
        } else {
          console.error('크루 대시보드 데이터를 불러오지 못했어요.', response.statusText);
        }
      } catch (error) {
        console.error('크루 대시보드 데이터를 불러오는데 문제가 발생했어요.', error);
      }
    };

    const fetchStatisticsData = async () => {
      try {
        const response = await client.get(`/crew/${id}/statistics`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setStatistics(response.data);
        } else {
          console.error('크루 분석 데이터를 불러올 수 없어요.', response.statusText);
        }
      } catch (error) {
        console.error('크루 분석 데이터를 불러오는데 문제가 발생했어요.', error);
      }
    };

    fetchCrewData();
    fetchStatisticsData();
  }, [id]);

  return (
    <div className="mt-20 flex flex-col gap-6">
      {crew ? (
        <Notice content={crew.notice} />
      ) : (
        <div className="w-full p-20">
          <div className="m-10 flex flex-col items-center justify-center">
            <DataLoadingSpinner />
          </div>
        </div>
      )}
      <div className="DashboardGrid w-full">
        {crew && statistics && (
          <>
            <div className="min-w-28">
              <LeftDashboard crew={crew} statistics={statistics} className="min-w-28" />
            </div>
            <div className="min-w-96">
              <RightDashboard crew={crew} statistics={statistics} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
