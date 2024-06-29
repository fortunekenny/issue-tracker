'use client'


import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {Skeleton } from '@/app/components'



interface User {
  id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    hashedPassword: string | null;
    image: string | null;
}


const AssigneeSelect = () => {

  const {data: users, error, isLoading } = useQuery<User[]>({
    queryKey:['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  })

if (isLoading) return <Skeleton/>



if (error) return null;


  return (
    <Select.Root>
        {/* <Select.Trigger placeholder={"Pick a fruit"} /> */}
        <Select.Trigger />
        <Select.Content>
            <Select.Group>
              <Select.Label>Suggestion</Select.Label>
                {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}
export default AssigneeSelect