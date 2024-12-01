"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddBlog from "./AddBlog";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import LoadingTableData from "@/components/Shared/Skeleton/LoadingTableData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import DeleteBlog from "./DeleteBlog";

const Blogs = () => {
  const { data: blogs, isLoading: isFetchingData } = useGetBlogsQuery({});

  return (
    <div>
      <AppHeader pageName="Blogs" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Blogs</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddBlog />
          </div>
        </div>

        <div>
          {isFetchingData && (
            <div>
              <LoadingTableData />
            </div>
          )}

          {!isFetchingData && blogs?.data?.length === 0 && (
            <div className="mb-5">
              <span className="text-slate-400">No Project Available</span>
            </div>
          )}

          {!isFetchingData && blogs?.data?.length > 0 && (
            <div className="mt-5">
              <Table className="border-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="md:w-40">Blog</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs?.data?.map(
                    (blog: {
                      id: string;
                      title: string;
                      content: string;
                      tags: string[];
                      image: string;
                      createdAt: string;
                    }) => (
                      <TableRow key={blog.id}>
                        <TableCell>
                          {blog?.image ? (
                            <Image
                              src={blog?.image}
                              width={150}
                              height={85}
                              alt={blog.title}
                              className="rounded-[5px] w-[80px] h-[50px]"
                            />
                          ) : (
                            <div className="w-[80px] h-[50px] rounded-[5px] bg-slate-200 text-white flex justify-center items-center">
                              <ImageIcon className="w-7 h-7" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {blog.title}
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {/* <UpdateBlog
                              blogId={blog.id}
                              blogTitle={blog.title}
                              blogData={blog}
                            /> */}
                            <DeleteBlog
                              blogId={blog.id}
                              blogTitle={blog.title}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
