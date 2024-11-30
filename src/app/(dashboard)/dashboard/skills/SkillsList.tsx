import { useGetSkillsQuery } from "@/redux/api/skillApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import DeleteSkill from "./DeleteSkill";
import UpdateSkill from "./UpdateSkill";
import LoadingTableData from "@/components/Shared/Skeleton/LoadingTableData";

const SkillsList = () => {
  const { data: skills, isLoading: isFetchingData } = useGetSkillsQuery({});

  return (
    <div className="mt-7">
      <h1 className="text-lg text-gray-600">All Skills</h1>

      <div className="mt-3">
        {isFetchingData && (
          <div>
            <LoadingTableData />
          </div>
        )}

        {!isFetchingData && skills?.data?.length === 0 && (
          <div className="mb-5">
            <span className="text-slate-400">No Skill Available</span>
          </div>
        )}

        {!isFetchingData && skills?.data?.length > 0 && (
          <Table className="border-2">
            <TableHeader>
              <TableRow>
                <TableHead>Skill Name</TableHead>
                <TableHead>Skill Level</TableHead>
                <TableHead>Skill Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills?.data.map(
                (skill: {
                  name: string;
                  id: string;
                  level: string;
                  category: {
                    id: string;
                    name: string;
                  };
                }) => (
                  <TableRow key={skill.id}>
                    <TableCell className="font-medium">{skill.name}</TableCell>
                    <TableCell>{skill.level}</TableCell>
                    <TableCell>{skill.category.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DeleteSkill
                          skillId={skill.id}
                          skillName={skill.name}
                        />
                        <UpdateSkill
                          skillId={skill.id}
                          skillName={skill.name}
                          skillLevel={skill.level}
                          skillCategory={skill.category.id}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default SkillsList;
