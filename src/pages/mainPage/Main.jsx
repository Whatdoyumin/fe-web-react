import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/animation.css';
import CodeAndBoat from '../../assets/mainPage/codeAndBoat.png';
import CrewDashboardScreen from '../../assets/mainPage/crewDashboardScreen.png';
import CrewCodereviewScreen from '../../assets/mainPage/crewCodereviewScreen.png';
import PortfolioScreen from '../../assets/mainPage/portfolioScreen.png';
import Footer from '../../components/common/footer';
import { FaTag } from 'react-icons/fa';
import { RiBarChart2Fill } from 'react-icons/ri';
import { MdAccessTimeFilled } from 'react-icons/md';

export default function Main() {
  const sectionsRef = useRef([]);
  const mathJaxRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [CrewDashboardScreen, CrewCodereviewScreen];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scroll-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSections = sectionsRef.current;

    currentSections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise([mathJaxRef.current]);
    }
  }, []);

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="absolute left-0 top-0 min-w-full">
      <div className="inline-flex h-[40rem] min-w-full items-end gap-3 bg-color-blue-main pl-[7.5rem]">
        <div className="flex flex-col gap-6">
          <p
            className="whitespace-nowrap text-4xl font-extrabold text-gray-50"
            ref={addToSectionsRef}
          >
            알고리즘 문제 해결 도우미
            <br />
            TLE와 함께 최적의 해결책을 찾아가요!
          </p>
          <div className="flex w-full justify-end">
            <img className="w-1/2" ref={addToSectionsRef} src={CodeAndBoat} alt="CodeAndBoat" />
          </div>
        </div>
      </div>

      <div className="h-128 top-144 left-0 flex min-w-full flex-col bg-white">
        <div className="mt-28 flex flex-col text-center">
          <div className="flex flex-col gap-6 text-center">
            <p
              className="text-center text-4xxl font-extrabold text-gray-800"
              ref={addToSectionsRef}
            >
              LLM의 힘으로 코딩 테스트의 바다를 항해해요
            </p>
            <div className="flex flex-col text-center text-gray-800">
              <p className="text-center text-xl font-bold" ref={addToSectionsRef}>
                문제를 분석하여 알고리즘 태그 분류, 난이도 분류, 예측 시간 복잡도를 제공해요
                <br />
              </p>
              <p className="text-center text-xl font-medium" ref={addToSectionsRef}>
                문제 등록만 해도 자동으로 분석되는 마법이 이루어집니다 🤩
              </p>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6">
            <div
              className="inline-flex w-1/4 flex-col items-start justify-start gap-2.5 rounded-3xl bg-color-blue-main p-10"
              ref={addToSectionsRef}
            >
              <div className="inline-flex items-center gap-3">
                <p className="text-xl font-extrabold text-white">알고리즘 태그</p>
                <FaTag size="1.25rem" color="white" />
              </div>
              <div className="inline-flex flex-wrap items-start justify-start gap-4">
                <div className="inline-flex min-w-16 items-center justify-center rounded-full bg-gray-200/25 px-4 py-3">
                  <p className="whitespace-nowrap text-white">#깊이 우선 탐색</p>
                </div>
                <div className="inline-flex min-w-16 items-center justify-center rounded-full bg-gray-200/25 px-4 py-3">
                  <p className="whitespace-nowrap text-white">#너비 우선 탐색</p>
                </div>
                <div className="inline-flex min-w-16 items-center justify-center rounded-full bg-gray-200/25 px-4 py-3">
                  <p className="whitespace-nowrap text-white">#구현</p>
                </div>
                <div className="inline-flex min-w-16 items-center justify-center rounded-full bg-gray-200/25 px-4 py-3">
                  <p className="whitespace-nowrap text-white">#그래프 탐색</p>
                </div>
              </div>
            </div>

            <div
              className="flex w-1/4 flex-col items-start justify-start gap-3 rounded-3xl bg-color-level2-yellow p-10"
              ref={addToSectionsRef}
            >
              {/* 난이도 데이터 */}
              <div className="inline-flex items-center gap-3">
                <p className="text-xl font-extrabold text-white">난이도</p>
                <RiBarChart2Fill size="1.5rem" color="white" />
              </div>
              {/* 레벨 데이터 */}
              <div className="flex flex-col items-start gap-3">
                <p className="text-xl font-bold text-white">레벨 2</p>
                <p className="whitespace-normal text-left font-medium text-white">
                  알고리즘, 해시, 동적 프로그래밍 등 고급 접근법이 필요한 문제들
                </p>
                {/* 난이도 설명 */}
              </div>
            </div>

            <div
              className="flex w-1/4 flex-col items-start justify-start gap-6 rounded-3xl bg-color-blue-main p-10"
              ref={addToSectionsRef}
            >
              <div className="inline-flex items-center gap-3">
                <p className="whitespace-nowrap text-xl font-extrabold text-white">
                  예측 시간 복잡도
                </p>
                <MdAccessTimeFilled size="1.5rem" color="white" />
              </div>
              <p className="text-lg text-white" ref={mathJaxRef}>
                $$O(E+V)$$
              </p>
            </div>
          </div>
        </div>

        <div className="mt-36 flex flex-col items-center">
          <p className="mb-12 text-center text-2xl font-bold text-gray-800" ref={addToSectionsRef}>
            힌트가 더 필요하다면, AI 제공 힌트를 활용할 수 있어요 😎
          </p>

          <div className="flex flex-col items-center">
            <div
              className="mb-6 inline-flex w-2/3 items-start justify-start rounded-xl border border-gray-200 bg-white p-10"
              ref={addToSectionsRef}
            >
              <p className="mr-2 text-xl text-gray-600">💡</p>
              <p className="longSentence text-gray-600">
                먼저 입력으로 주어진 그래프 정보를 인접 리스트 형태로 저장합니다.
              </p>
            </div>
            <div
              className="mb-6 inline-flex w-2/3 items-start justify-start rounded-xl border border-gray-200 bg-white p-10"
              ref={addToSectionsRef}
            >
              <p className="mr-2 text-xl text-gray-600">💡</p>
              <p className="longSentence text-gray-600">
                DFS 탐색은 재귀 함수를 사용하여 구현할 수 있습니다. 현재 노드를 방문한 후, 연결된
                노드들을 재귀적으로 탐색합니다.
              </p>
            </div>
            <div
              className="mb-6 inline-flex w-2/3 items-start justify-start rounded-xl border border-gray-200 bg-white p-10"
              ref={addToSectionsRef}
            >
              <p className="mr-2 text-xl text-gray-600">💡</p>
              <p className="longSentence text-gray-600">
                BFS 탐색은 큐 자료구조를 이용하여 구현할 수 있습니다. 시작 노드를 큐에 넣고, 큐에서
                노드를 하나씩 꺼내 방문하면서 연결된 노드들을 큐에 추가합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="left-0 flex h-fit w-full flex-col bg-white">
        <div className="mt-28 flex flex-col items-center gap-6">
          <div className="flex flex-col">
            <p
              className="whitespace-nowrap text-center text-4xxl font-extrabold text-gray-800"
              ref={addToSectionsRef}
            >
              크루와 함께라면 험난한 문제도 두렵지 않습니다.
            </p>
            <div className="flex flex-col text-center text-gray-800">
              <p className="text-xl font-bold" ref={addToSectionsRef}>
                스터디 그룹 관리 기능을 통해 크루원들과 함께 성장할 수 있는 환경을 제공해요
                <br />
              </p>
              <p className="text-xl font-medium" ref={addToSectionsRef}>
                대시보드를 통해 한 눈에 진행사항을 파악하고 코드 리뷰로 함께 성장하는 경험을
                만들어가요 🌈
              </p>
            </div>
          </div>
          <div className="w-10/12" ref={addToSectionsRef}>
            <img src={images[currentImage]} alt="CrewScreen" />
          </div>
        </div>
      </div>

      <div className="left-0 flex w-full flex-col bg-white">
        <div className="mt-28 flex flex-col flex-wrap items-center" ref={addToSectionsRef}>
          <div className="flex flex-col">
            <p
              className="whitespace-nowrap text-center text-4xxl font-extrabold text-gray-800"
              ref={addToSectionsRef}
            >
              나의 성장 기록, TLE가 함께합니다.
            </p>
            <div className="flex flex-col text-center text-gray-800">
              <p className="text-xl font-bold" ref={addToSectionsRef}>
                문제 해결 여정이 분석되면, 나만의 포트폴리오로 성장을 증명할 수 있어요
              </p>
              <p className="text-xl font-medium" ref={addToSectionsRef}>
                TLE는 개인의 문제 풀이 분석 정보를 제공하여 포트폴리오 제작을 돕습니다 🏃‍♂️
              </p>
            </div>
          </div>
          <div className="flex w-full justify-end" ref={addToSectionsRef}>
            <img className="w-2/3" src={PortfolioScreen} alt="PortfolioScreen" />
          </div>
        </div>
      </div>

      <div className="left-0 flex h-fit w-full flex-col bg-color-blue-main">
        <div className="mt-28">
          <p className="text-center text-3xxl font-extrabold text-white">
            지금 바로 TLE의 선원이 되어, 알고리즘 문제 해결 모험을 시작하세요!
          </p>
          <div className="mt-6 text-center">
            <div className="mb-16 text-white">
              <p className="text-xl font-bold">
                코딩 테스트 준비는 더 이상 혼자가 아닙니다.
                <br />
              </p>
              <p className="text-xl font-medium">
                TLE와 함께라면 해결책을 찾아가는 여정이 더욱 즐거워져요 ☺️
              </p>
            </div>
            <Link
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-16 py-6 text-xl font-extrabold text-color-blue-main
             transition duration-300 ease-in-out hover:bg-white/25 hover:text-white"
              to="/crew"
            >
              TLE와 함께 도전하기 🔥
            </Link>
          </div>
        </div>
        <div className="w-full px-[120px]">
          <Footer color="white" />
        </div>
      </div>
    </div>
  );
}
