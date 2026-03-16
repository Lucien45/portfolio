import { useState } from 'react';
import Icon, { type IconName } from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

type Certification = {
  name: string;
  issuer: string;
  status: 'Active' | 'Expired' | 'Pending' | string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  skills?: string[];
  certificateUrl?: string | null;
  badgeUrl?: string | null;
};

interface CertificationBadgeProps {
  certification: Certification;
}

const CertificationBadge = ({ certification }: CertificationBadgeProps) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerified(true);
    setIsVerifying(false);
  };

  const getStatusColor = (status: Certification['status']): string => {
    switch (status) {
      case 'Active': return 'text-github-green bg-github-green/10';
      case 'Expired': return 'text-error bg-error/10';
      case 'Pending': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: Certification['status']): IconName => {
    switch (status) {
      case 'Active': return 'CheckCircle';
      case 'Expired': return 'XCircle';
      case 'Pending': return 'Clock';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Award" size={24} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{certification?.name}</h3>
            <p className="text-sm text-muted-foreground">{certification?.issuer}</p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certification?.status)}`}>
          <Icon name={getStatusIcon(certification?.status)} size={12} />
          <span>{certification?.status}</span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Issued Date</span>
          <span className="text-sm font-medium text-foreground">{certification?.issuedDate}</span>
        </div>
        
        {certification?.expiryDate && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Expires</span>
            <span className="text-sm font-medium text-foreground">{certification?.expiryDate}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Credential ID</span>
          <span className="text-sm font-mono text-foreground">{certification?.credentialId}</span>
        </div>
      </div>
      {certification?.skills && (
        <div className="mb-4">
          <p className="text-xs font-medium text-foreground mb-2">Skills Validated</p>
          <div className="flex flex-wrap gap-1">
            {certification?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          {isVerified ? (
            <div className="flex items-center space-x-2 text-github-green">
              <Icon name="ShieldCheck" size={16} />
              <span className="text-xs font-medium">Verified</span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              loading={isVerifying}
              onClick={handleVerify}
            >
              Verify
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {certification?.certificateUrl && (
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={() => {
                const url = certification.certificateUrl;
                if (url) window.open(url, '_blank');
              }}
            >
              View
            </Button>
          )}
          
          {certification?.badgeUrl && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => {
                const url = certification.badgeUrl;
                if (url) window.open(url, '_blank');
              }}
            >
              Badge
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationBadge;