import { useState } from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

type Skill = {
  name: 'React' | 'TypeScript' | 'Node.js' | 'Python' | string;
  icon: IconName;
  bgColor: string;
};

interface CodeSandboxProps {
  skill: Skill;
}

const CodeSandbox = ({ skill }: CodeSandboxProps) => {
  const [activeTab, setActiveTab] = useState<'code' | 'output'>('code');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');

  const codeExamples: Record<string, { code: string; output: string }> = {
    'React': {
      code: `import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <div className="skills">
        {user.skills.map(skill => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;`,
      output: `✅ Component rendered successfully!

📊 Performance Metrics:
• First Paint: 12ms
• Component Mount: 8ms
• Re-renders: 0

🎯 Features Demonstrated:
• React Hooks (useState, useEffect)
• Conditional Rendering
• Props Handling
• Error Boundaries
• Component Lifecycle`
    },
    'TypeScript': {
      code: `interface User {
  id: number;
  name: string;
  email: string;
  skills: string[];
  avatar?: string;
}

interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

class UserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchUser(id: number): Promise<User> {
    try {
      const response = await fetch(\`\${this.baseUrl}/users/\${id}\`);
      const result: ApiResponse<User> = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.message || 'Failed to fetch user');
      }
      
      return result.data;
    } catch (error) {
      throw new Error(\`User fetch failed: \${error.message}\`);
    }
  }

  validateUser(user: Partial<User>): user is User {
    return !!(user.id && user.name && user.email);
  }
}

export { UserService, type User, type ApiResponse };`,
      output: `✅ TypeScript compilation successful!

🔍 Type Analysis:
• Interfaces: 2 defined
• Classes: 1 implemented
• Generic Types: 1 used
• Type Guards: 1 implemented

📋 Code Quality:
• Type Safety: 100%
• Null Checks: ✅
• Error Handling: ✅
• Generic Constraints: ✅`
    },
    'Node.js': {
      code: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID'
      });
    }

    // Simulate database query
    const user = await getUserById(parseInt(id));
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      output: `🚀 Server started successfully!

📡 API Endpoints:
• GET /api/users/:id - User retrieval
• Rate limiting: 100 req/15min
• CORS enabled
• Security headers active

🛡️ Security Features:
• Helmet.js protection
• Input validation
• Error handling
• Rate limiting

📊 Performance:
• Response time: <50ms
• Memory usage: 45MB
• CPU usage: 2%`
    },
    'Python': {
      code: `from typing import List, Optional, Dict, Any
import asyncio
import aiohttp
from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    id: int
    name: str
    email: str
    skills: List[str]
    created_at: datetime
    avatar: Optional[str] = None

class UserRepository:
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.session: Optional[aiohttp.ClientSession] = None

    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def get_user(self, user_id: int) -> Optional[User]:
        if not self.session:
            raise RuntimeError("Repository not initialized")

        try:
            async with self.session.get(
                f"{self.db_url}/users/{user_id}"
            ) as response:
                if response.status == 404:
                    return None
                
                response.raise_for_status()
                data = await response.json()
                
                return User(
                    id=data['id'],
                    name=data['name'],
                    email=data['email'],
                    skills=data['skills'],
                    created_at=datetime.fromisoformat(data['created_at']),
                    avatar=data.get('avatar')
                )
        except aiohttp.ClientError as e:
            raise Exception(f"Failed to fetch user: {e}")

# Usage example
async def main():
    async with UserRepository("https://api.example.com") as repo:
        user = await repo.get_user(123)
        if user:
            print(f"User: {user.name} ({user.email})")
            print(f"Skills: {', '.join(user.skills)}")

if __name__ == "__main__":
    asyncio.run(main())`,
      output: `🐍 Python execution completed!

📦 Features Demonstrated:
• Async/Await patterns
• Type hints & dataclasses
• Context managers
• Error handling
• HTTP client usage

⚡ Performance Metrics:
• Execution time: 0.045s
• Memory usage: 12.3MB
• Async operations: 1

✅ Code Quality:
• Type coverage: 95%
• PEP 8 compliant: ✅
• Error handling: ✅`
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setActiveTab('output');
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const example = codeExamples?.[skill?.name] || codeExamples['React'];
    setOutput(example.output);
    setIsRunning(false);
  };

  const copyCode = () => {
    const example = codeExamples?.[skill?.name] || codeExamples['React'];
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(example.code).catch(() => {});
    }
  };

  const example = codeExamples?.[skill?.name] || codeExamples['React'];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${skill?.bgColor}`}>
            <Icon name={skill?.icon} size={16} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{skill?.name} Sandbox</h3>
            <p className="text-xs text-muted-foreground">Interactive code demonstration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            iconPosition="left"
            onClick={copyCode}
          >
            Copy
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
            loading={isRunning}
            onClick={runCode}
          >
            Run Code
          </Button>
        </div>
      </div>
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'code' ?'bg-background text-foreground border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Code" size={16} className="inline mr-2" />
          Code
        </button>
        <button
          onClick={() => setActiveTab('output')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'output' ?'bg-background text-foreground border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Terminal" size={16} className="inline mr-2" />
          Output
        </button>
      </div>
      <div className="h-96 overflow-auto">
        {activeTab === 'code' ? (
          <pre className="p-4 text-sm font-mono text-foreground bg-background leading-relaxed">
            <code>{example?.code}</code>
          </pre>
        ) : (
          <div className="p-4">
            {isRunning ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-muted-foreground">Executing code...</span>
                </div>
              </div>
            ) : output ? (
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {output}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Icon name="Play" size={32} className="mx-auto mb-2 opacity-50" />
                  <p>Click "Run Code" to see the output</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeSandbox;