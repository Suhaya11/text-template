"use client";

import { useState, useEffect, useRef } from 'react';
import { BiSend, BiSearch } from 'react-icons/bi';

export default function ChatClient({ users, currentUser }: { users: any[]; currentUser: any }) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.ugNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/messages/${selectedUser._id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiver: selectedUser._id,
          text: newMessage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...messages, data]);
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Sidebar: User List */}
      <div className="w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search colleagues..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl text-sm outline-none focus:ring-1 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-zinc-50 dark:border-zinc-800/30 ${
                selectedUser?._id === user._id ? 'bg-green-50 dark:bg-green-900/10' : ''
              }`}
            >
              <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-500 overflow-hidden shrink-0">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  user.name[0]
                )}
              </div>
              <div className="text-left overflow-hidden">
                <p className="font-semibold text-zinc-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-zinc-500 truncate">{user.ugNumber}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main: Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-50/30 dark:bg-black/20">
        {selectedUser ? (
          <>
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-500 overflow-hidden">
                {selectedUser.profilePicture ? (
                  <img src={selectedUser.profilePicture} alt={selectedUser.name} className="h-full w-full object-cover" />
                ) : (
                  selectedUser.name[0]
                )}
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">{selectedUser.name}</p>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isMine = msg.sender === currentUser._id;
                return (
                  <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm ${
                        isMine
                          ? 'bg-green-600 text-white rounded-tr-none'
                          : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 rounded-tl-none border border-zinc-100 dark:border-zinc-800/50'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${isMine ? 'text-green-100' : 'text-zinc-400'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-green-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <BiSend size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="h-20 w-20 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mb-4">
               <BiSend size={40} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Your Messages</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mt-2">
              Select a colleague from the list to start a conversation.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
