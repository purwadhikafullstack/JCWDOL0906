import {
  Image,
} from "@chakra-ui/react";
import logogmedsnial2 from "../assets/svg/logogmedsnial2.png"
export function Loading(){
    return(
        <div
        style={{
            display: "flex",
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <Image
        src={logogmedsnial2}
        />
                {/* <AiOutlineLoading3Quarters className='animate-spin' size={'100px'}/> */}
                {/* <div className='text-2xl font-semibold ml-3'>
                    Loading...
                </div> */}
        </div>
    )
};
