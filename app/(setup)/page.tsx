import { initalProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const SetupPage = async() => {
    const profile = await initalProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: (profile as { id: string }).id || ""
                    // profileId: profile?.id || ""
                }
            }
        }
    });

    if (server) {
        return redirect(`/server/${server.id}`);
    }
    return ( <div>
        Create a server
    </div> );
}
 
export default SetupPage;