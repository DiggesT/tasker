import { useParams } from "react-router-dom";
import { Segment } from "../../components/Segment";
import { trpc } from "../../lib/trpc";

export const ViewTaskPage = () => {
  const { taskId } = useParams() as { taskId: string };
  const { data } = trpc.getTask.useQuery({ id: taskId });

  return data?.task ? (
    <Segment
      title={data.task.title}
      description={
        data.task.completed ? "Task is completed." : `Task isn't completed.`
      }
    />
  ) : (
    <span>Empty.</span>
  );
};
