import React, { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Boxes,
  CircleUserRound,
  ExternalLink,
  NotebookPen,
  ShieldCheck,
  Zap,
} from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Features() {
  const features = useRef(null)

  useGSAP(
    () => {
      gsap.from("h1", {
        scrollTrigger: "h1",
        y: 100,
        opacity: 0,
        duration: 1,
      })
      gsap.from(".tester", {
        scrollTrigger: ".tester",
        y: 100,
        opacity: 0,
        duration: 1,
      })
    },
    { scope: features }
  )

  return (
    <section
      id='features'
      ref={features}
      className='w-full min-h-[120vh] py-28 pb-36 flex flex-col relative items-center gap-10 overflow-hidden'
    >
      {/* <img
        src='/images/book2.png'
        className='absolute left-5 top-5 w-40'
      /> */}
      {/* <Lottie
        className='absolute top-0 left-0 w-16'
        animationData={eyeAnimation}
        loop={true}
      /> */}

      <h1 className='text-6xl font-semibold tracking-tight text-primary pb-10'>
        Features
      </h1>
      <div className='tester w-8/12 grid grid-rows-2 gap-0'>
        <div
          id='row1'
          className=' row w-full grid grid-cols-3 bg-black'
        >
          {/* <img
              src='/images/bookk.png'
              className='absolute left-0 bottom-0 w-48 z-20 -rotate-90 translate-x-[-61%]'
            /> */}
          <Card>
            <img
              src='images/star.gif'
              className='z-30 absolute top-0 right-0 w-16 translate-x-1/3 -translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <img
              src='images/star.gif'
              className='z-30 absolute bottom-0 left-0 w-24 -translate-x-[40%] translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <CardHeader>
              <Boxes
                size={48}
                color='#7a90f9'
                className='mb-2'
              />
              <CardTitle>Phong phú, đa dạng</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              <p className=''>
                Website cung cấp một thư viện sách đồ sộ với hơn{" "}
                <span className='custom-underline'>20000 tựa sách</span>, bao
                gồm các tác phẩm kinh điển, sách mới và nhiều tài liệu nghiên
                cứu giá trị.
              </p>
            </CardContent>
          </Card>
          <Card>
            <img
              src='images/star.gif'
              className='z-30 absolute top-0 right-0 w-16 translate-x-1/3 -translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <img
              src='images/star.gif'
              className='z-30 absolute bottom-0 left-0 w-24 -translate-x-[40%] translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <CardHeader>
              <Zap
                size={48}
                color='#7a90f9'
                className='mb-2'
              />
              <CardTitle>Nhanh, tiện lợi</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Tính năng{" "}
                <span className='custom-underline'>tìm kiếm bằng nội dung</span>{" "}
                đột phá giúp người dùng tiết kiệm thời gian khi tìm sách. Đặc
                biệt, người dùng có thể bắt đầu đọc ngay mà không cần phải đăng
                nhập.
              </p>
            </CardContent>
          </Card>
          {/* <div className='relative'>
            <img
              src='/images/book3.png'
              className='absolute right-[-10%] top-0 w-56 translate-y-[-50%] z-20'
            /> */}

          <Card>
            <img
              src='images/star.gif'
              className='z-30 absolute top-0 right-0 w-16 translate-x-1/3 -translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <img
              src='images/star.gif'
              className='z-30 absolute bottom-0 left-0 w-24 -translate-x-[40%] translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <CardHeader>
              <CircleUserRound
                size={48}
                color='#7a90f9'
                className='mb-2'
              />
              <CardTitle>Thân thiện, linh hoạt</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Giao diện thân thiện với người dùng. Cho phép người dùng tùy
                chỉnh giao diện và chức năng theo nhu cầu cá nhân, mang lại{" "}
                <span className='custom-underline'>
                  trải nghiệm cá nhân hóa
                </span>{" "}
                tốt nhất.
              </p>
            </CardContent>
          </Card>
        </div>
        {/* </div> */}
        <div
          id='row2'
          className='row w-full grid grid-cols-3 bg-black'
        >
          <Card>
            <img
              src='images/star.gif'
              className='z-30 absolute top-0 right-0 w-16 translate-x-1/3 -translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <img
              src='images/star.gif'
              className='z-30 absolute bottom-0 left-0 w-24 -translate-x-[40%] translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <CardHeader>
              <ShieldCheck
                size={48}
                color='#7a90f9'
                className='mb-2'
              />
              <CardTitle>Hiện đại, bảo mật</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Công nghệ hiện đại mang lại trải nghiệm chất lượng cao cho người
                dùng. Thông tin cá nhân người dùng được bảo mật tuyệt đối.{" "}
                <span className='custom-underline'>
                  Không quảng cáo, không cookie.
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <img
              src='images/star.gif'
              className='z-30 absolute top-0 right-0 w-16 translate-x-1/3 -translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <img
              src='images/star.gif'
              className='z-30 absolute bottom-0 left-0 w-24 -translate-x-[40%] translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <CardHeader>
              <NotebookPen
                size={48}
                color='#7a90f9'
                className='mb-2'
              />
              <CardTitle>Tích hợp ghi chú</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Website cung cấp nền tảng tích hợp cho việc{" "}
                <span className='custom-underline'>ghi chú khi đọc sách</span>,
                giúp người dùng lưu lại những ý tưởng quan trọng và dễ dàng truy
                cập lại sau này.
              </p>
            </CardContent>
          </Card>
          <Card>
            <img
              src='images/star.gif'
              className='z-30 absolute top-0 right-0 w-16 translate-x-1/3 -translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <img
              src='images/star.gif'
              className='z-30 absolute bottom-0 left-0 w-24 -translate-x-[40%] translate-y-1/3 opacity-0 transition-opacity duration-500'
            />
            <CardHeader>
              <ExternalLink
                size={48}
                color='#7a90f9'
                className='mb-2'
              />
              <CardTitle>Chia sẻ</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Người dùng có thể{" "}
                <span className='custom-underline'>chia sẻ sách</span> cũng như
                ghi chú và ý tưởng với bạn bè, đồng nghiệp, tạo điều kiện cho
                việc thảo luận và trao đổi kiến thức.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Features
