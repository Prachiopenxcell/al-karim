"use client";
import Image from "next/image";

export function AuthHeader() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center items-center mb-8">
      <div className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="Al Karim" width={250} height={38} priority />
          </div>
        
      </div>
    </div>
  );
}
