"use client";

import UserResponseForm from "@/components/UserResponseForm";
import { Button } from "@/components/ui/button";
import useSingleTopicFetch from "@/hooks/useSingleTopicFetch";
import { formatedDate } from "@/lib/formateDate";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const DiscussDetailsPage = ({ params }: { params: { did: string } }) => {
  const router = useRouter();

  const { topic, isLoading, refetch } = useSingleTopicFetch({
    params: params.did,
  });
  const user = useSelector((state: RootState) => state?.user?.user);

  return (
    <main className="wrapper section-padding min-h-[calc(100vh-4rem)]">
      <div>
        <Button
          onClick={() => router.back()}
          variant="destructive"
          size="sm"
          className="rounded-full"
        >
          <IoIosArrowBack />
        </Button>
      </div>

      {/* Chat box */}
      <div className="border-2 border-muted my-10 px-3 md:px-10 py-4 rounded-xl overflow-auto">
        <div>
          {/* User response */}
          <div className="border-b pb-4">
            <div className="flex items-center gap-2 my-2">
              <div className="h-8 w-8 border-2 rounded-full bg-[#075571] flex justify-center items-center">
                <p className="text-white">{user?.user.name[0]}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {user?.user?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatedDate(topic?.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="heading2">{topic?.title}</h2>
              <p className="paragraph">{topic?.message}</p>
            </div>
          </div>

          {/* User response */}
          {topic?.responses?.map((item: any) => (
            <div className="mt-6 border-b pb-4" key={item._id}>
              <div className="flex items-center gap-2 my-2">
                <div className="h-8 w-8 border-2 rounded-full bg-[#075571] flex justify-center items-center">
                  <p className="text-white">{user?.user.name[0]}</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {user?.user?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatedDate(item.timestamp)}
                  </p>
                </div>
              </div>

              <p>{item.content}</p>
            </div>
          ))}
        </div>

        <UserResponseForm topicId={params.did} refetch={refetch} />
      </div>
    </main>
  );
};

export default DiscussDetailsPage;
