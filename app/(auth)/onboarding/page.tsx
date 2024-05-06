import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <div className=" bg-black">
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 '>
      <h1 className='head-text'>Complete Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        One last step before you join TagTalk.
      </p>

      <section className='mt-9 bg-dark-2 p-10 rounded-3xl'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main></div>
  );
}

export default Page;
