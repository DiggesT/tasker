import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { layoutContentElRef } from "../../components/Layout";
import { Segment } from "../../components/Segment";
import { trpc } from "../../lib/trpc";
import css from "./index.module.scss";
import { viewTasksRoute } from "../../lib/routes";

export const AllTasksPage = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getTasks.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  const setCompleted = trpc.updateTask.useMutation();

  const trpcUtils = trpc.useUtils();

  return (
    <Segment title="All Tasks">
      {isLoading || isRefetching ? (
        <span>Loading...</span>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].tasks.length ? (
        <Alert color="brown">Empty for now.</Alert>
      ) : (
        <div className={css.tasks}>
          <InfiniteScroll
            threshold={100}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage();
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <span>Loading...</span>
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={
              (layoutContentElRef.current &&
                getComputedStyle(layoutContentElRef.current).overflow) !==
              "auto"
            }
          >
            {data.pages
              .flatMap((page) => page.tasks)
              .map((task) => (
                <div className={css.task} key={task.id}>
                  <Segment
                    size={2}
                    title={
                      <>
                        <Link
                          className={css.taskLink}
                          to={viewTasksRoute(task.id)}
                        >
                          {task.title}
                        </Link>
                        <input
                          type="checkbox"
                          name="scales"
                          checked={task.completed}
                          onChange={async () => {
                            await setCompleted.mutateAsync({
                              id: task.id,
                              completed: !task.completed,
                            });
                            void trpcUtils.invalidate();
                          }}
                        />
                      </>
                    }
                  />
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
};
