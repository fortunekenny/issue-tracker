'use client'


import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {Skeleton } from '@/app/components'
import { Issue } from "@prisma/client"
import toast, {Toaster} from 'react-hot-toast'



interface User {
  id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    hashedPassword: string | null;
    image: string | null;
}


const AssigneeSelect = ({issue} : {issue: Issue}) => {

  const {data: users, error, isLoading } = useQuery<User[]>({
    queryKey:['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  })

if (isLoading) return <Skeleton/>

if (error) return null;

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || ''} onValueChange={(userId) => {
        axios
          .patch(`/api/issues/${issue.id}`, {assignedToUserId: userId || null})
          .catch(() => {toast.error('Changes could not be saved.')})
      }}>
          {/* <Select.Trigger placeholder={"Pick a fruit"} /> */}
          <Select.Trigger />
          <Select.Content>
              <Select.Group>
                <Select.Label>Suggestion</Select.Label>
                <Select.Item value=''>Unassigned</Select.Item>
                  {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
              </Select.Group>
          </Select.Content>
      </Select.Root>
      <Toaster/>
    </>
  )
}
export default AssigneeSelect