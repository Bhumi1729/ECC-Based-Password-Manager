"use client"; 
import { FeatureSteps } from "./ui/feature-section"

const features = [
  { 
    step: 'Security Feature', 
    title: 'End-to-End Encryption',
    content: 'All stored passwords are encrypted using industry-leading Elliptic Curve Cryptography (ECC), ensuring that your data remains private even in the event of a server breach. Our multi-layered encryption approach keeps your sensitive information secure at all times.', 
    image: 'https://www.shutterstock.com/image-illustration/ecc-acronym-elliptic-curve-cryptography-600nw-2546011399.jpg' 
  },
  { 
    step: 'Privacy Feature',
    title: 'Zero-Knowledge Architecture',
    content: 'Our zero-knowledge design means that only you can access your passwords. Neither our company nor any third parties can view your encrypted data, even when stored on our servers. Your master password never leaves your device, giving you complete control over your security.', 
    image: 'https://eu-images.contentstack.com/v3/assets/blt07f68461ccd75245/blt5d878dddaca05b7e/6618046b06903684578f5fd0/GettyImages-1227400166-1100x733-c605274.jpeg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale'
  },
  { 
    step: 'Convenience Feature',
    title: 'Secure Multi-Device Sync',
    content: 'Seamlessly access your password vault across all your devices without compromising security. Our advanced synchronization protocol maintains end-to-end encryption throughout the syncing process, ensuring your data remains protected regardless of which device you use.', 
    image: 'https://t4.ftcdn.net/jpg/05/18/00/87/360_F_518008773_SHsIw5lbLEITbUmmcxOhPxDEYLd3e9El.jpg'
  },
  { 
    step: 'Reliability Feature',
    title: 'Backup & Recovery',
    content: 'Never lose access to your important accounts with our secure backup and recovery system. Create encrypted backups of your password vault that only you can restore. Our recovery process is designed with multiple verification layers to prevent unauthorized access while ensuring you regain access quickly.', 
    image: 'https://www.globalts.com/images/easyblog_shared/October_2019_Newsletter/2.5/BDR_400.jpg'
  },
]

export function FeatureStepsDemo() {
  return (
    <div id="features" className="relative w-full min-h-screen bg-[#050816] overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute blur-xl bg-blue-500 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              borderRadius: '50%',
              transform: `scale(${Math.random() * 0.8 + 0.2})`,
              animation: `float ${Math.random() * 20 + 20}s infinite alternate ease-in-out`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3QgaWQ9InBhdHRlcm4tYmFja2dyb3VuZCIgd2lkdGg9IjQwMCUiIGhlaWdodD0iNDAwJSIgZmlsbD0icmdiYSgxMCwgMTAsIDI2LDEpIj48L3JlY3Q+PHBhdGggZmlsbD0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMDMpIiBkPSJNLTEwIDMwaDYwdjEwaC02MHoiPjwvcGF0aD48cGF0aCBmaWxsPSJyZ2JhKDE0NywgNTEsIDIzNCwgMC4wMykiIGQ9Ik0tMTAgMGg2MHYxMGgtNjB6Ij48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI3BhdHRlcm4pIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIj48L3JlY3Q+PC9zdmc+')] opacity-30 pointer-events-none" />
      
      <FeatureSteps 
        features={features}
        title="Next-Level Security for Your Passwords"
        autoPlayInterval={3000} // Updated to 3 seconds (3000ms)
        imageHeight="h-[550px]"
        className="relative z-10"
      />

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(0.8);
          }
          100% {
            transform: translate(50px, 50px) scale(1);
          }
        }
      `}</style>
    </div>
  )
}