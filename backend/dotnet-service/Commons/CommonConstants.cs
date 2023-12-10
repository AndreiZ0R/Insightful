namespace dotnet_service.Commons
{
    public class CommonConstants
    {
        public static class Time
        {
            public static readonly int FiveSeconds = 5;
        }

        public enum Roles
        {
            JobSeeker,
            Recruiter
        }

        public static class VisionStatus
        {
            public static readonly string PartialBlindness = "Partial Blindness";
            public static readonly string FullBlindness = "Full Blindness";
            public static readonly string NotSpecified = "Not specified";
        }
    }
}
