'use client';

import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const DiscordGetInfo = () => {
  const [email, setEmail] = useState('');
  const [adminSecret, setAdminSecret] = useState('');

  return (
    <div>
      <div className="grid w-full grid-rows-5 rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="row-span-3 grid items-center gap-2 p-6">
          <div className="text-3xl font-bold">Get Discord Information</div>
          <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
            Enter the information below to get username of the user.
          </div>
        </div>

        <div className="row-span-2 flex items-center p-6">
          <Label className="sr-only">EMAIL</Label>
          <Input
            className="w-full"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            style={{
              minWidth: '0',
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="row-span-2 flex items-center p-6">
          <Label className="sr-only">Admin password</Label>
          <Input
            className="w-full"
            id="adminPassword"
            name="adminPassword"
            placeholder="Admin password"
            style={{
              minWidth: '0',
            }}
            onChange={(e) => {
              setAdminSecret(e.target.value);
            }}
          />
        </div>
        <div className="row-span-2 flex items-center justify-center space-x-2 p-6">
          <Button
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={async () => {
              const response = await fetch('/api/admin/discord/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  adminSecret,
                }),
              });
              const json = await response.json();
              if (response.status !== 200) {
                toast.warning(`Something went wrong ${json.msg}`);
              }
              toast.info(`Username: ${json.username}`, { duration: 5000 });
            }}
          >
            Get information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscordGetInfo;