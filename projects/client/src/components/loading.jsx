import {AiOutlineLoading3Quarters} from "react-icons/ai"

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
                <AiOutlineLoading3Quarters className='animate-spin' size={'100px'}/>
                <div className='text-2xl font-semibold ml-3'>
                    Loading...
                </div>
        </div>
    )
};
