import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

export function NotificationCard({
    isShown,
    setIsShown,
}: {
    isShown: boolean;
    setIsShown: Dispatch<SetStateAction<boolean>>;
}) {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className="absolute w-[320px] -bottom-5 left-2" onClick={e => e.stopPropagation()} >
            {/* Arrow */}
            <div className={cn("absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black shadow-sm ", {
                "animate-in fade-in": isShown && !isHidden,
                "animate-out fade-out opacity-0 pointer-events-none": !isShown,
                hidden: isHidden,
            })} />

            {/* Card */}
            <Card
                onAnimationEnd={() => {
                    if (!isShown) setIsHidden(true);
                }}
                className={cn(
                    "px-6 absolute w-full top-full left-2 duration-700 bg-black border-black",
                    {
                        "animate-in fade-in": isShown && !isHidden,
                        "animate-out fade-out opacity-0 pointer-events-none": !isShown,
                        hidden: isHidden,
                    }
                )}
            >
                <CardContent className="text-left space-y-2 p-0 w-full text-wrap">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/assets/images/hand.png"
                            width={20}
                            height={20}
                            alt="hand image"
                        /><p className="text-sm font-semibold font-roboto text-white">Hey there!</p>
                    </div>
                    <p className="text-xs text-[#F5F5F5E5] font-roboto font-semibold">
                        Click here and let us walk you through how easy it is to connect
                        your practice management system — it only takes a few seconds.
                    </p>
                </CardContent>
                <CardFooter className="p-0 pt-4">
                    <Button
                        className="w-fit bg-[#F5F5F5E5] text-black ml-auto hover:bg-[#F5F5F5]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsShown(false);
                        }}
                    >
                        Got it!
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
