interface LinkedinHeaderProps {
  userProfile: {
    name: string;
    title: string;
    location: string;
    linkedin?: string;
  };
}

export function LinkedinHeader(
  { userProfile }: LinkedinHeaderProps) {  
    return (    
    <span>
      LinkedIn:{" "}
      <a 
        href={`https://${userProfile.linkedin?.replace(/^https?:\/\//i, '') || ''}`}
        target="_blank" 
        title={`LinkedIn Profile of ${userProfile.name}`}
        rel="follow noopener noreferrer external"
        className="hover:underline"
      >
        {userProfile.linkedin?.replace(/^https?:\/\//i, '') || ''}
      </a>
    </span>
  )
}
